import {
  Euler,
  Event as ThreeEvent,
  EventDispatcher,
  Matrix3,
  PerspectiveCamera,
  Spherical,
  Vector2,
  Vector3,
} from 'three';
import { clamp } from '../utils.js';
import { Damper, SETTLING_TIME } from './Damper.js';

export const DEFAULT_OPTIONS = Object.freeze({
  minimumRadius: 0,
  maximumRadius: Infinity,
  minimumPolarAngle: Math.PI / 8,
  maximumPolarAngle: Math.PI - Math.PI / 8,
  minimumAzimuthalAngle: -Infinity,
  maximumAzimuthalAngle: Infinity,
  minimumFieldOfView: 10,
  maximumFieldOfView: 45,
  touchAction: 'none',
});

// Constants
const KEYBOARD_ORBIT_INCREMENT = Math.PI / 8;
const ZOOM_SENSITIVITY = 0.04;

// The move size on pan key event
const PAN_KEY_INCREMENT = 10;

export const KeyCode = {
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

export const ChangeSource = {
  USER_INTERACTION: 'user-interaction',
  NONE: 'none',
  AUTOMATIC: 'automatic',
};

export class SmoothControls extends EventDispatcher {
  orbitSensitivity = 1;
  inputSensitivity = 1;
  changeSource = ChangeSource.NONE;

  _interactionEnabled = false;
  _options;
  _disableZoom = false;
  isUserPointing = false;

  // Pan state
  enablePan = true;
  enableTap = true;
  panProjection = new Matrix3();
  panPerPixel = 0;

  // Internal orbital position state
  spherical = new Spherical();
  goalSpherical = new Spherical();
  thetaDamper = new Damper();
  phiDamper = new Damper();
  radiusDamper = new Damper();
  logFov = Math.log(DEFAULT_OPTIONS.maximumFieldOfView);
  goalLogFov = this.logFov;
  fovDamper = new Damper();

  // Pointer state
  touchMode = null;
  pointers = [];
  startTime = 0;
  startPointerPosition = { clientX: 0, clientY: 0 };
  lastSeparation = 0;
  touchDecided = false;

  constructor(camera, element, scene) {
    super();

    this.camera = camera;

    this._options = Object.assign({}, DEFAULT_OPTIONS);

    this.setOrbit(0, Math.PI / 2, 1);
    this.setFieldOfView(100);
    this.jumpToGoal();
  }

  /**
   * The options that are currently configured for the controls instance.
   */
  get options() {
    return this._options;
  }

  /**
   * Copy the spherical values that represent the current camera orbital
   * position relative to the configured target into a provided Spherical
   * instance. If no Spherical is provided, a new Spherical will be allocated
   * to copy the values into. The Spherical that values are copied into is
   * returned.
   */
  getCameraSpherical(target = new Spherical()) {
    return target.copy(this.spherical);
  }

  /**
   * Returns the camera's current vertical field of view in degrees.
   */
  getFieldOfView() {
    return this.camera.fov;
  }

  /**
   * Set the absolute orbital goal of the camera. The change will be
   * applied over a number of frames depending on configured acceleration and
   * dampening _options.
   *
   * Returns true if invoking the method will result in the camera changing
   * position and/or rotation, otherwise false.
   */
  setOrbit(
    goalTheta = this.goalSpherical.theta,
    goalPhi = this.goalSpherical.phi,
    goalRadius = this.goalSpherical.radius
  ) {
    const {
      minimumAzimuthalAngle,
      maximumAzimuthalAngle,
      minimumPolarAngle,
      maximumPolarAngle,
      minimumRadius,
      maximumRadius,
    } = this._options;

    const { theta, phi, radius } = this.goalSpherical;

    const nextTheta = clamp(goalTheta, minimumAzimuthalAngle, maximumAzimuthalAngle);
    if (!isFinite(minimumAzimuthalAngle) && !isFinite(maximumAzimuthalAngle)) {
      this.spherical.theta = this.wrapAngle(this.spherical.theta - nextTheta) + nextTheta;
    }

    const nextPhi = clamp(goalPhi, minimumPolarAngle, maximumPolarAngle);
    const nextRadius = clamp(goalRadius, minimumRadius, maximumRadius);

    if (nextTheta === theta && nextPhi === phi && nextRadius === radius) {
      return false;
    }

    if (!isFinite(nextTheta) || !isFinite(nextPhi) || !isFinite(nextRadius)) {
      return false;
    }

    this.goalSpherical.theta = nextTheta;
    this.goalSpherical.phi = nextPhi;
    this.goalSpherical.radius = nextRadius;
    this.goalSpherical.makeSafe();

    return true;
  }

  /**
   * Subset of setOrbit() above, which only sets the camera's radius.
   */
  setRadius(radius) {
    this.goalSpherical.radius = radius;
    this.setOrbit();
  }

  /**
   * Sets the goal field of view for the camera
   */
  setFieldOfView(fov) {
    const { minimumFieldOfView, maximumFieldOfView } = this._options;
    fov = clamp(fov, minimumFieldOfView, maximumFieldOfView);
    this.goalLogFov = Math.log(fov);
  }

  /**
   * Sets the smoothing decay time.
   */
  setDamperDecayTime(decayMilliseconds) {
    this.thetaDamper.setDecayTime(decayMilliseconds);
    this.phiDamper.setDecayTime(decayMilliseconds);
    this.radiusDamper.setDecayTime(decayMilliseconds);
    this.fovDamper.setDecayTime(decayMilliseconds);
  }

  /**
   * Adjust the orbital position of the camera relative to its current orbital
   * position. Does not let the theta goal get more than pi ahead of the current
   * theta, which ensures interpolation continues in the direction of the delta.
   * The deltaZoom parameter adjusts both the field of view and the orbit radius
   * such that they progress across their allowed ranges in sync.
   */
  adjustOrbit(deltaTheta, deltaPhi, deltaZoom) {
    const { theta, phi, radius } = this.goalSpherical;
    const { minimumRadius, maximumRadius, minimumFieldOfView, maximumFieldOfView } = this._options;

    const dTheta = this.spherical.theta - theta;
    const dThetaLimit = Math.PI - 0.001;
    const goalTheta = theta - clamp(deltaTheta, -dThetaLimit - dTheta, dThetaLimit - dTheta);
    const goalPhi = phi - deltaPhi;

    const deltaRatio =
      deltaZoom === 0
        ? 0
        : ((deltaZoom > 0 ? maximumRadius : minimumRadius) - radius) /
          (Math.log(deltaZoom > 0 ? maximumFieldOfView : minimumFieldOfView) - this.goalLogFov);

    const goalRadius = radius + deltaZoom * (isFinite(deltaRatio) ? deltaRatio : (maximumRadius - minimumRadius) * 2);
    this.setOrbit(goalTheta, goalPhi, goalRadius);

    if (deltaZoom !== 0) {
      const goalLogFov = this.goalLogFov + deltaZoom;
      this.setFieldOfView(Math.exp(goalLogFov));
    }
  }

  /**
   * Move the camera instantly instead of accelerating toward the goal
   * parameters.
   */
  jumpToGoal() {
    this.update(0, SETTLING_TIME);
  }

  /**
   * Update controls. In most cases, this will result in the camera
   * interpolating its position and rotation until it lines up with the
   * designated goal orbital position. Returns false if the camera did not move.
   *
   * Time and delta are measured in milliseconds.
   */
  update(_time, delta) {
    if (this.isStationary()) {
      return false;
    }
    const { maximumPolarAngle, maximumRadius } = this._options;

    const dTheta = this.spherical.theta - this.goalSpherical.theta;
    if (
      Math.abs(dTheta) > Math.PI &&
      !isFinite(this._options.minimumAzimuthalAngle) &&
      !isFinite(this._options.maximumAzimuthalAngle)
    ) {
      this.spherical.theta -= Math.sign(dTheta) * 2 * Math.PI;
    }

    this.spherical.theta = this.thetaDamper.update(this.spherical.theta, this.goalSpherical.theta, delta, Math.PI);

    this.spherical.phi = this.phiDamper.update(this.spherical.phi, this.goalSpherical.phi, delta, maximumPolarAngle);

    this.spherical.radius = this.radiusDamper.update(
      this.spherical.radius,
      this.goalSpherical.radius,
      delta,
      maximumRadius
    );

    this.logFov = this.fovDamper.update(this.logFov, this.goalLogFov, delta, 1);

    this.moveCamera();
    return true;
  }

  updateTouchActionStyle() {
    const { style } = this.element;

    if (this._interactionEnabled) {
      const { touchAction } = this._options;
      if (this._disableZoom && touchAction !== 'none') {
        style.touchAction = 'manipulation';
      } else {
        style.touchAction = touchAction;
      }
    } else {
      style.touchAction = '';
    }
  }

  isStationary() {
    return (
      this.goalSpherical.theta === this.spherical.theta &&
      this.goalSpherical.phi === this.spherical.phi &&
      this.goalSpherical.radius === this.spherical.radius &&
      this.goalLogFov === this.logFov
    );
  }

  moveCamera() {
    // Derive the new camera position from the updated spherical:
    this.spherical.makeSafe();
    this.camera.position.setFromSpherical(this.spherical);
    this.camera.setRotationFromEuler(new Euler(this.spherical.phi - Math.PI / 2, this.spherical.theta, 0, 'YXZ'));

    if (this.camera.fov !== Math.exp(this.logFov)) {
      this.camera.fov = Math.exp(this.logFov);
      this.camera.updateProjectionMatrix();
    }
  }

  // Wraps to between -pi and pi
  wrapAngle(radians) {
    const normalized = (radians + Math.PI) / (2 * Math.PI);
    const wrapped = normalized - Math.floor(normalized);
    return wrapped * 2 * Math.PI - Math.PI;
  }
}
