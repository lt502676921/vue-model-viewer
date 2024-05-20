<script>
import * as THREE from 'three';
import { defineComponent } from 'vue';
// import { Object3D } from 'three';
import { MeshPhysicalMaterial } from 'three';
import { OBJLoader } from './custom-objloader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
// import { LoadingManager } from 'three/src/loaders/LoadingManager';
import { toIndexed } from './utils';
import mixin from './model-mixin.vue';

export default defineComponent({
  name: 'model-obj',
  mixins: [mixin],
  props: {
    lights: {
      type: Array,
      default: () => {
        return [
          {
            type: 'HemisphereLight',
            position: { x: 0, y: 1, z: 0 },
            skyColor: 0xaaaaff,
            groundColor: 0x806060,
            intensity: 0.2,
          },
          {
            type: 'DirectionalLight',
            position: { x: 1, y: 1, z: 1 },
            color: 0xffffff,
            intensity: 0.8,
          },
        ];
      },
    },
    smoothing: {
      type: Boolean,
      default: false,
    },
    mtlPath: {
      type: String,
    },
    mtl: {
      type: String,
    },
  },
  data() {
    // TODO: Better way to handle texture formats
    this.loadingManager.addHandler(/\.dds$/i, new DDSLoader());

    const objLoader = new OBJLoader(this.loadingManager);
    const mtlLoader = new MTLLoader(this.loadingManager);

    mtlLoader.setCrossOrigin(this.crossOrigin);
    mtlLoader.setRequestHeader(this.requestHeader);
    objLoader.setRequestHeader(this.requestHeader);

    return {
      loader: objLoader,
      mtlLoader,
    };
  },
  watch: {
    mtl() {
      this.load();
    },
  },
  methods: {
    process(object) {
      if (this.smoothing) {
        object.traverse(child => {
          if (child.geometry) {
            child.geometry = toIndexed(child.geometry);
            child.geometry.computeVertexNormals();
          }
        });
      }
    },
    load() {
      if (this.object) {
        this.wrapper.remove(this.object);
      }

      if (!this.src) return;

      const onLoad = object => {
        object.traverse(child => {
          if (child.isMesh) {
            const temp = child.material;
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new MeshPhysicalMaterial({ map: temp.map });
            if (child.material.map) child.material.map.anisotropy = 16;
            child.material.roughness = 0.4;
            child.material.needsUpdate = true;
          }
        });

        this.reportProgress('end');
        if (this.process) {
          this.process(object);
        }

        this.addObject(object);

        this.updateObjectInfo();

        // 测试计算体积
        if (this.deliverVolumeAndSize) {
          let size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3());

          if (this.dimensionDivTextContent) {
            this.wrapper.add(
              this.createDimension(
                { x: -size.x / 2 - size.x / 10, y: size.y / 2, z: 0 },
                { x: -size.x / 2 - size.x / 10, y: -size.y / 2, z: 0 }
              )
            );
          }
          // const targetHeight = 8;
          // const scale = targetHeight / size.y;
          // object.scale.set(scale, scale, scale)

          // this.wrapper.add(new THREE.BoxHelper(object));

          object.traverse(child => {
            if (child.geometry) {
              // this.deliverVolume(this.computeVolume(child.geometry) * Math.pow(scale, 3), size)
              this.deliverVolumeAndSize(this.computeVolume(child.geometry), size);
            }
          });
        }

        this.$emit('load');
      };

      const onProgress = event => {
        this.reportProgress('progress', event);
        this.$emit('progress', event);
      };

      const onError = event => {
        this.reportProgress('end');
        this.$emit('error', event);
      };

      this.reportProgress('start');

      if (this.mtl) {
        let { mtlPath } = this;
        let mtlSrc = this.mtl;

        if (!this.mtlPath) {
          const result = /^(.*\/)([^/]*)$/.exec(this.mtl);

          if (result) {
            mtlPath = result[1];
            mtlSrc = result[2];
          }
        }

        if (mtlPath) {
          this.mtlLoader.setPath(mtlPath);
        }

        this.mtlLoader.load(
          mtlSrc,
          materials => {
            materials.preload();

            this.loader.setMaterials(materials).load(this.src, onLoad, onProgress, onError);
          },
          () => {},
          onError
        );
      } else {
        this.loader.load(this.src, onLoad, onProgress, onError);
      }
    },
  },
});
</script>
