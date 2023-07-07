<template>
  <div style="position: relative; width: 100%; height: 100%; margin: 0; border: 0; padding: 0" ref="container">
    <slot name="progress-bar" :progress="progress" v-if="progress.isComplete === false">
      <!-- <div style="position: absolute; z-index: 2; height: 3px; width: 100%; background-color: rgba(0, 0, 0, 0.04)">
        <div
          :style="{
            width: `${loadProgressPercentage}%`,
            height: '100%',
            backgroundColor: '#1890ff',
            transition: 'width .2s',
          }"
        />
      </div> -->
      <div
        ref="loadingBarElement"
        style="
          position: absolute;
          top: 50%;
          width: 100%;
          height: 2px;
          background-color: #ffffff;
          transform: scaleX(0);
          transform-origin: top left;
          transition: transform 0.5s;
          will-change: transform;
        "
        :style="{ transform: `scaleX(${loadProgressPercentage}%)` }"
      />
    </slot>
    <div
      ref="interaction-prompt"
      style="
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        opacity: 0;
        will-change: opacity;
        transition: opacity 0.3s;
      "
    >
      <div
        id="prompt"
        ref="animated-container"
        style="will-change: transform, opacity; opacity: 0; transition: opacity 0.3s"
      >
        <slot name="interaction-prompt" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="36">
            <defs>
              <path id="A" d="M.001.232h24.997V36H.001z"></path>
            </defs>
            <g transform="translate(-11 -4)" fill="none" fill-rule="evenodd">
              <path fill-opacity="0" fill="#fff" d="M0 0h44v44H0z"></path>
              <g transform="translate(11 3)">
                <path
                  d="M8.733 11.165c.04-1.108.766-2.027 1.743-2.307a2.54 2.54 0 0 1 .628-.089c.16 0 .314.017.463.044 1.088.2 1.9 1.092 1.9 2.16v8.88h1.26c2.943-1.39 5-4.45 5-8.025a9.01 9.01 0 0 0-1.9-5.56l-.43-.5c-.765-.838-1.683-1.522-2.712-2-1.057-.49-2.226-.77-3.46-.77s-2.4.278-3.46.77c-1.03.478-1.947 1.162-2.71 2l-.43.5a9.01 9.01 0 0 0-1.9 5.56 9.04 9.04 0 0 0 .094 1.305c.03.21.088.41.13.617l.136.624c.083.286.196.56.305.832l.124.333a8.78 8.78 0 0 0 .509.953l.065.122a8.69 8.69 0 0 0 3.521 3.191l1.11.537v-9.178z"
                  fill-opacity=".5"
                  fill="#e4e4e4"
                ></path>
                <path
                  d="M22.94 26.218l-2.76 7.74c-.172.485-.676.8-1.253.8H12.24c-1.606 0-3.092-.68-3.98-1.82-1.592-2.048-3.647-3.822-6.11-5.27-.095-.055-.15-.137-.152-.23-.004-.1.046-.196.193-.297.56-.393 1.234-.6 1.926-.6a3.43 3.43 0 0 1 .691.069l4.922.994V10.972c0-.663.615-1.203 1.37-1.203s1.373.54 1.373 1.203v9.882h2.953c.273 0 .533.073.757.21l6.257 3.874c.027.017.045.042.07.06.41.296.586.77.426 1.22M4.1 16.614c-.024-.04-.042-.083-.065-.122a8.69 8.69 0 0 1-.509-.953c-.048-.107-.08-.223-.124-.333l-.305-.832c-.058-.202-.09-.416-.136-.624l-.13-.617a9.03 9.03 0 0 1-.094-1.305c0-2.107.714-4.04 1.9-5.56l.43-.5c.764-.84 1.682-1.523 2.71-2 1.058-.49 2.226-.77 3.46-.77s2.402.28 3.46.77c1.03.477 1.947 1.16 2.712 2l.428.5a9 9 0 0 1 1.901 5.559c0 3.577-2.056 6.636-5 8.026h-1.26v-8.882c0-1.067-.822-1.96-1.9-2.16-.15-.028-.304-.044-.463-.044-.22 0-.427.037-.628.09-.977.28-1.703 1.198-1.743 2.306v9.178l-1.11-.537C6.18 19.098 4.96 18 4.1 16.614M22.97 24.09l-6.256-3.874c-.102-.063-.218-.098-.33-.144 2.683-1.8 4.354-4.855 4.354-8.243 0-.486-.037-.964-.104-1.43a9.97 9.97 0 0 0-1.57-4.128l-.295-.408-.066-.092a10.05 10.05 0 0 0-.949-1.078c-.342-.334-.708-.643-1.094-.922-1.155-.834-2.492-1.412-3.94-1.65l-.732-.088-.748-.03a9.29 9.29 0 0 0-1.482.119c-1.447.238-2.786.816-3.94 1.65a9.33 9.33 0 0 0-.813.686 9.59 9.59 0 0 0-.845.877l-.385.437-.36.5-.288.468-.418.778-.04.09c-.593 1.28-.93 2.71-.93 4.222 0 3.832 2.182 7.342 5.56 8.938l1.437.68v4.946L5 25.64a4.44 4.44 0 0 0-.888-.086c-.017 0-.034.003-.05.003-.252.004-.503.033-.75.08a5.08 5.08 0 0 0-.237.056c-.193.046-.382.107-.568.18-.075.03-.15.057-.225.1-.25.114-.494.244-.723.405a1.31 1.31 0 0 0-.566 1.122 1.28 1.28 0 0 0 .645 1.051C4 29.925 5.96 31.614 7.473 33.563a5.06 5.06 0 0 0 .434.491c1.086 1.082 2.656 1.713 4.326 1.715h6.697c.748-.001 1.43-.333 1.858-.872.142-.18.256-.38.336-.602l2.757-7.74c.094-.26.13-.53.112-.794s-.088-.52-.203-.76a2.19 2.19 0 0 0-.821-.91"
                  fill-opacity=".6"
                  fill="#000"
                ></path>
                <path
                  d="M22.444 24.94l-6.257-3.874a1.45 1.45 0 0 0-.757-.211h-2.953v-9.88c0-.663-.616-1.203-1.373-1.203s-1.37.54-1.37 1.203v16.643l-4.922-.994a3.44 3.44 0 0 0-.692-.069 3.35 3.35 0 0 0-1.925.598c-.147.102-.198.198-.194.298.004.094.058.176.153.23 2.462 1.448 4.517 3.22 6.11 5.27.887 1.14 2.373 1.82 3.98 1.82h6.686c.577 0 1.08-.326 1.253-.8l2.76-7.74c.16-.448-.017-.923-.426-1.22-.025-.02-.043-.043-.07-.06z"
                  fill="#fff"
                ></path>
                <g transform="translate(0 .769)">
                  <mask id="B" fill="#fff">
                    <use xlink:href="#A"></use>
                  </mask>
                  <path
                    d="M23.993 24.992a1.96 1.96 0 0 1-.111.794l-2.758 7.74c-.08.22-.194.423-.336.602-.427.54-1.11.87-1.857.872h-6.698c-1.67-.002-3.24-.633-4.326-1.715-.154-.154-.3-.318-.434-.49C5.96 30.846 4 29.157 1.646 27.773c-.385-.225-.626-.618-.645-1.05a1.31 1.31 0 0 1 .566-1.122 4.56 4.56 0 0 1 .723-.405l.225-.1a4.3 4.3 0 0 1 .568-.18l.237-.056c.248-.046.5-.075.75-.08.018 0 .034-.003.05-.003.303-.001.597.027.89.086l3.722.752V20.68l-1.436-.68c-3.377-1.596-5.56-5.106-5.56-8.938 0-1.51.336-2.94.93-4.222.015-.03.025-.06.04-.09.127-.267.268-.525.418-.778.093-.16.186-.316.288-.468.063-.095.133-.186.2-.277L3.773 5c.118-.155.26-.29.385-.437.266-.3.544-.604.845-.877a9.33 9.33 0 0 1 .813-.686C6.97 2.167 8.31 1.59 9.757 1.35a9.27 9.27 0 0 1 1.481-.119 8.82 8.82 0 0 1 .748.031c.247.02.49.05.733.088 1.448.238 2.786.816 3.94 1.65.387.28.752.588 1.094.922a9.94 9.94 0 0 1 .949 1.078l.066.092c.102.133.203.268.295.408a9.97 9.97 0 0 1 1.571 4.128c.066.467.103.945.103 1.43 0 3.388-1.67 6.453-4.353 8.243.11.046.227.08.33.144l6.256 3.874c.37.23.645.55.82.9.115.24.185.498.203.76m.697-1.195c-.265-.55-.677-1.007-1.194-1.326l-5.323-3.297c2.255-2.037 3.564-4.97 3.564-8.114 0-2.19-.637-4.304-1.84-6.114-.126-.188-.26-.37-.4-.552-.645-.848-1.402-1.6-2.252-2.204C15.472.91 13.393.232 11.238.232A10.21 10.21 0 0 0 5.23 2.19c-.848.614-1.606 1.356-2.253 2.205-.136.18-.272.363-.398.55C1.374 6.756.737 8.87.737 11.06c0 4.218 2.407 8.08 6.133 9.842l.863.41v3.092l-2.525-.51c-.356-.07-.717-.106-1.076-.106a5.45 5.45 0 0 0-3.14.996c-.653.46-1.022 1.202-.99 1.983a2.28 2.28 0 0 0 1.138 1.872c2.24 1.318 4.106 2.923 5.543 4.772 1.26 1.62 3.333 2.59 5.55 2.592h6.698c1.42-.001 2.68-.86 3.134-2.138l2.76-7.74c.272-.757.224-1.584-.134-2.325"
                    fill-opacity=".05"
                    fill="#000"
                    mask="url(#B)"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </slot>
      </div>
    </div>
    <div v-if="progress.isComplete === false" style="position: absolute; z-index: 1; width: 100%; height: 100%">
      <slot name="poster" />
    </div>
    <canvas ref="canvas" style="width: 100%; height: 100%" @mousedown="play" @mousewheel="play" @touchstart="play"></canvas>
  </div>
</template>

<script>
import {
  Object3D,
  Vector2,
  Vector3,
  Color,
  Scene,
  Light,
  Raycaster,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  HemisphereLight,
  DirectionalLight,
  LinearEncoding,
  Loader,
  LoadingManager,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { getSize, getCenter } from './utils';
import { defineComponent } from 'vue';
import { timeline } from './animation.js';
import { SmoothControls, ChangeSource } from './three-components/SmoothControls.js';
import { ModelScene } from './three-components/ModelScene.js';

const DEFAULT_GL_OPTIONS = {
  antialias: true,
  alpha: true,
};

const wiggle = timeline({
  initialValue: 0,
  keyframes: [
    { frames: 5, value: -1 },
    { frames: 1, value: -1 },
    { frames: 8, value: 1 },
    { frames: 1, value: 1 },
    { frames: 5, value: 0 },
    { frames: 18, value: 0 },
  ],
});

const fade = timeline({
  initialValue: 0,
  keyframes: [
    { frames: 1, value: 1 },
    { frames: 5, value: 1 },
    { frames: 1, value: 0 },
    { frames: 6, value: 0 },
  ],
});

export default defineComponent({
  props: {
    src: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    position: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    rotation: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    scale: {
      type: Object,
      default: () => {
        return { x: 1, y: 1, z: 1 };
      },
    },
    lights: {
      type: Array,
      default: () => {
        return [];
      },
    },
    cameraPosition: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    cameraRotation: {
      type: Object,
      default: () => {
        return { x: 0, y: 0, z: 0 };
      },
    },
    cameraUp: {
      type: Object,
    },
    cameraLookAt: {
      type: Object,
    },
    backgroundColor: {
      default: 0xffffff,
    },
    backgroundAlpha: {
      type: Number,
      default: 1,
    },
    controlsOptions: {
      type: Object,
    },
    crossOrigin: {
      type: String,
      default: 'anonymous',
    },
    requestHeader: {
      type: Object,
      default: () => {},
    },
    outputEncoding: {
      type: Number,
      default: LinearEncoding,
    },
    glOptions: {
      type: Object,
    },
  },
  data() {
    const result = {
      object: null,
      raycaster: new Raycaster(),
      mouse: new Vector2(),
      camera: new PerspectiveCamera(45, 1, 0.1, 100),
      scene: new Scene(),
      wrapper: new Object3D(),
      renderer: null,
      controls: null,
      allLights: [],
      clock: typeof performance === 'undefined' ? Date : performance,
      reqId: null, // requestAnimationFrame id,
      loader: null, // 会被具体实现的组件覆盖
      isPlayed: false, // 是否把玩过场景
      lastPromptOffset: 0,
      lastTick: performance.now(),
      promptElementVisibleTime: Infinity,
      smoothControls: null,
      loadingBarElement: null,
      loadingManager: new LoadingManager(
        // Loaded
        () => {
          this.progress.endedAt = Date.now();
          this.promptElementVisibleTime = performance.now();
          this.$refs['interaction-prompt'].style.opacity = 1;

          gsap.delayedCall(0.5, () => {
            gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 });

            if (this.loadingBarElement) {
              this.loadingBarElement.style.transformOrigin = 'top right';
              this.loadingBarElement.style.transition = 'transform 1.5s ease-in-out';
              this.loadingBarElement.style.transform = 'scaleX(0)';
              const that = this;
              // 添加transform结束事件的监听器
              this.loadingBarElement.addEventListener('transitionend', function (event) {
                // 检查是否是对transform属性的过渡效果结束
                if (event.propertyName === 'transform') {
                  // 执行相应的回调操作
                  that.progress.isComplete = true;
                  window.setTimeout(
                    () => that.renderer.setAnimationLoop((time, frame) => that.startFingerGuideAnimation(time, frame)),
                    2000
                  );
                }
              });
            } else {
              this.progress.isComplete = true;
              window.setTimeout(
                () => this.renderer.setAnimationLoop((time, frame) => this.startFingerGuideAnimation(time, frame)),
                2000
              );
            }
          });
        },

        // Progress, 下载完以后的加载进度
        (itemUrl, itemsLoaded, itemsTotal) => {
          const progressRatio = (itemsLoaded / itemsTotal) * 100;
          if (this.loadingBarElement) {
            if (progressRatio == 100) {
              this.progress.isProgressComplete = true;
            }
          }
        }
      ),
      overlayMaterial: new ShaderMaterial({
        transparent: true,
        uniforms: {
          uAlpha: { value: 1 },
        },
        vertexShader: `
          void main()
          {
              gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uAlpha;

          void main()
          {
              gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
          }
        `,
      }),
    };

    // 确保这些对象不被转为 vue reactive 对象，避免 three 渲染出错
    Object.assign(this, result);

    const reactiveState = {
      size: {
        width: this.width,
        height: this.height,
      },
      progress: {
        isComplete: false,
        lengthComputable: false,
        loaded: 0,
        isProgressComplete: false, // 只用来控制进度条
      },
    };

    // 为了保留类型信息，仍然返回 result 的 type
    return reactiveState;
  },
  computed: {
    loadProgressPercentage() {
      if (this.progress.isProgressComplete) return 100;
      if (this.progress.lengthComputable) {
        // lengthComputable 为 false 时，total 无直接参考意义，但是这里仍然使用它 * 3来作为估计值
        // 因为 gzip 压缩后的长度大约为三分之一
        return Math.min(0.92, this.progress.loaded / (this.progress.total * 3)) * 100;
      }
      return (
        Math.min(
          1,
          isNaN(this.progress.loaded / this.progress.total) ? 0 : this.progress.loaded / this.progress.total
        ) * 100
      );
    },
  },
  mounted() {
    this.lastTick = performance.now();

    // this.scene = new ModelScene({
    //   canvas: this.$refs.canvas,
    //   element: this.$refs.container,
    //   width: this.$refs.container.offsetWidth,
    //   height: this.$refs.container.offsetHeight,
    // });

    // this.camera = this.scene.camera;

    this.smoothControls = new SmoothControls(this.camera);

    if (this.width === undefined || this.height === undefined) {
      this.size = {
        width: this.$refs.container.offsetWidth,
        height: this.$refs.container.offsetHeight,
      };
    }

    const options = Object.assign({}, DEFAULT_GL_OPTIONS, this.glOptions, {
      canvas: this.$refs.canvas,
    });

    this.renderer = new WebGLRenderer(options);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = this.outputEncoding;

    this.controls = new OrbitControls(this.camera, this.$refs.container);
    // this.controls.type = 'orbit';

    /**
     * loadingBarElement
     */
    this.loadingBarElement = this.$refs.loadingBarElement;

    /**
     * Overlay
     */
    if (this.loadingBarElement) {
      const overlayGeometry = new PlaneGeometry(2, 2, 1, 1);
      const overlay = new Mesh(overlayGeometry, this.overlayMaterial);
      this.scene.add(overlay);
    }

    this.scene.add(this.wrapper);

    this.load();
    this.update();

    const element = this.$refs.container;

    element.addEventListener('mousedown', this.onMouseDown, false);
    element.addEventListener('mousemove', this.onMouseMove, false);
    element.addEventListener('mouseup', this.onMouseUp, false);
    element.addEventListener('click', this.onClick, false);
    element.addEventListener('dblclick', this.onDblclick, false);

    window.addEventListener('resize', this.onResize, false);

    this.animate();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.reqId);

    this.renderer.dispose();

    if (this.controls) {
      this.controls.dispose();
    }

    const element = this.$refs.container;

    element.removeEventListener('mousedown', this.onMouseDown, false);
    element.removeEventListener('mousemove', this.onMouseMove, false);
    element.removeEventListener('mouseup', this.onMouseUp, false);
    element.removeEventListener('click', this.onClick, false);
    element.removeEventListener('dblclick', this.onDblclick, false);

    window.removeEventListener('resize', this.onResize, false);
  },
  watch: {
    src() {
      this.load();
    },
    rotation: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.rotation.set(val.x, val.y, val.z);
      },
    },
    position: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.position.set(val.x, val.y, val.z);
      },
    },
    scale: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.scale.set(val.x, val.y, val.z);
      },
    },
    lights: {
      deep: true,
      handler() {
        this.updateLights();
      },
    },
    size: {
      deep: true,
      handler() {
        this.updateCamera();
        this.updateRenderer();
      },
    },
    controlsOptions: {
      deep: true,
      handler() {
        this.updateControls();
      },
    },
    backgroundAlpha() {
      this.updateRenderer();
    },
    backgroundColor() {
      this.updateRenderer();
    },
  },
  methods: {
    onResize() {
      if (this.width === undefined || this.height === undefined) {
        this.$nextTick(() => {
          this.size = {
            width: this.$refs.container.offsetWidth,
            height: this.$refs.container.offsetHeight,
          };
        });
      }
    },
    onMouseDown(event) {
      if (!this.$attrs.onMousedown) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mousedown', event, intersected);
    },
    onMouseMove(event) {
      // console.log(this.$attrs);
      if (!this.$attrs.onMousemove) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mousemove', event, intersected);
    },
    onMouseUp(event) {
      if (!this.$attrs.onMouseup) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('mouseup', event, intersected);
    },
    onClick(event) {
      if (!this.$attrs.onClick) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('click', event, intersected);
    },
    onDblclick(event) {
      if (!this.$attrs.onDblclick) return;

      const intersected = this.pick(event.clientX, event.clientY);
      this.$emit('dblclick', event, intersected);
    },
    pick(x, y) {
      if (!this.object) return null;
      if (!this.$refs.container) return;

      const rect = this.$refs.container.getBoundingClientRect();

      x -= rect.left;
      y -= rect.top;

      this.mouse.x = (x / this.size.width) * 2 - 1;
      this.mouse.y = -(y / this.size.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObject(this.object, true);

      return (intersects && intersects.length) > 0 ? intersects[0] : null;
    },
    update() {
      this.updateRenderer();
      this.updateCamera();
      this.updateLights();
      this.updateControls();
    },
    updateModel() {
      const { object } = this;

      if (!object) return;

      const { position } = this;
      const { rotation } = this;
      const { scale } = this;

      object.position.set(position.x, position.y, position.z);
      object.rotation.set(rotation.x, rotation.y, rotation.z);
      object.scale.set(scale.x, scale.y, scale.z);
    },
    updateRenderer() {
      const { renderer } = this;

      renderer.setSize(this.size.width, this.size.height);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setClearColor(new Color(this.backgroundColor).getHex());
      renderer.setClearAlpha(this.backgroundAlpha);
    },
    updateCamera() {
      const { camera } = this;
      const { object } = this;

      camera.aspect = this.size.width / this.size.height;
      camera.updateProjectionMatrix();

      if (!this.cameraLookAt || !this.cameraUp) {
        if (!object) return;

        const distance = getSize(object).length();

        camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);

        if (this.cameraPosition.x === 0 && this.cameraPosition.y === 0 && this.cameraPosition.z === 0) {
          camera.position.z = distance;
          this.smoothControls.setRadius(distance);
        }

        camera.lookAt(new Vector3());
      } else {
        camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);
        camera.up.set(this.cameraUp.x, this.cameraUp.y, this.cameraUp.z);

        camera.lookAt(new Vector3(this.cameraLookAt.x, this.cameraLookAt.y, this.cameraLookAt.z));
      }
    },
    updateLights() {
      this.scene.remove(...this.allLights);

      this.allLights = [];

      this.lights.forEach(item => {
        if (!item.type) return;

        const type = item.type.toLowerCase();

        let light = null;

        if (type === 'ambient' || type === 'ambientlight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0x404040;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new AmbientLight(color, intensity);
        } else if (type === 'point' || type === 'pointlight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;
          const distance = item.distance || 0;
          const decay = item.decay === 0 ? item.decay : item.decay || 1;

          light = new PointLight(color, intensity, distance, decay);

          if (item.position) {
            light.position.copy(item.position);
          }
        } else if (type === 'directional' || type === 'directionallight') {
          const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new DirectionalLight(color, intensity);

          if (item.position) {
            light.position.copy(item.position);
          }

          if (item.target) {
            light.target.copy(item.target);
          }
        } else if (type === 'hemisphere' || type === 'hemispherelight') {
          const skyColor = item.skyColor === 0x000000 ? item.skyColor : item.skyColor || 0xffffff;
          const groundColor = item.groundColor === 0x000000 ? item.groundColor : item.groundColor || 0xffffff;
          const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

          light = new HemisphereLight(skyColor, groundColor, intensity);

          if (item.position) {
            light.position.copy(item.position);
          }
        }

        if (light) {
          this.allLights.push(light);
          this.scene.add(light);
        }
      });
    },
    updateControls() {
      if (this.controlsOptions) {
        Object.assign(this.controls, this.controlsOptions);
      }
    },
    reportProgress(type, data) {
      if (type === 'start') {
        this.progress.isComplete = false;
        this.progress.startedAt = Date.now();
        this.progress.loaded = 0;
        this.progress.total = 0;
      } else if (type === 'end') {
        // 此处表示下载资源完成，等待加载
        // 加载完成后的逻辑交给LoadingManager的loaded事件处理
        // this.progress.isComplete = true;
        // this.progress.endedAt = Date.now();
      } else {
        this.progress.lengthComputable = data?.lengthComputable ?? false;
        this.progress.loaded = data?.loaded ?? 0;
        this.progress.total = data?.total ?? 0;
      }
    },
    load() {
      if (!this.src) return;

      if (this.object) {
        this.wrapper.remove(this.object);
      }

      this.loader.setRequestHeader(this.requestHeader);

      this.reportProgress('start');

      this.loader.load(
        this.src,
        (...args) => {
          this.reportProgress('end');

          const object = this.getObject(...args);

          this.process(object);

          this.addObject(object);

          this.$emit('load');
        },
        event => {
          this.reportProgress('progress', event);
          this.$emit('progress', event);
        },
        event => {
          this.reportProgress('end');
          this.$emit('error', event);
        }
      );
    },
    process(object) {
      return object;
    },
    getObject(object) {
      return object;
    },
    addObject(object) {
      this.object = object;
      this.wrapper.add(object);

      this.updateCamera();
      this.updateModel();

      const center = getCenter(object);

      // correct position
      this.wrapper.position.copy(center.negate());
    },
    animate() {
      this.reqId = requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    startFingerGuideAnimation(t, frame) {
      const delta = t - this.lastTick;
      this.lastTick = t;

      const animatedContainer = this.$refs['animated-container'];

      if (animatedContainer && !this.isPlayed) {
        const now = performance.now();
        const animationTime = ((now - this.promptElementVisibleTime) / 5000) % 1;
        const offset = wiggle(animationTime);
        const opacity = fade(animationTime);
        animatedContainer.style.opacity = `${opacity}`;
        if (offset !== this.lastPromptOffset) {
          const xOffset = offset * this.size.width * 0.05;
          const deltaTheta = ((offset - this.lastPromptOffset) * Math.PI) / 16;

          animatedContainer.style.transform = `translateX(${xOffset}px)`;

          this.smoothControls.changeSource = ChangeSource.AUTOMATIC;

          this.smoothControls.adjustOrbit(deltaTheta, 0, 0);

          this.lastPromptOffset = offset;
        }

        this.smoothControls.update(t, delta);
        // this.scene.updateTarget(delta);
      }
    },
    play(event) {
      console.log(event);
      this.isPlayed = true;
      this.$refs['interaction-prompt'].style.opacity = 0;
    },
  },
});
</script>
