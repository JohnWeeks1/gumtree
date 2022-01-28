<template>
  <div id="images">
    <cropper
      ref="cropper"
      class="cropper"
      :src="image.src"
      :stencil-props="{
        aspectRatio: 5 / 4,
      }"
    />
    <div class="button-wrapper" :class="{ 'pt-3': image.src !== '' }">
      <b-button class="btn-sm" @click="$refs.file.click()">
        <input
          type="file"
          ref="file"
          @change="uploadImage($event)"
          accept="image/*"
        />
        <div v-if="image.src !== ''">Change image</div>
        <div v-else>Upload image</div>
      </b-button>
      <b-button
        v-if="image.src"
        class="btn btn-sm btn-danger ml-2"
        @click.prevent="cropImage()"
      >
        Crop image
      </b-button>
    </div>
  </div>
</template>

<script>
// vue-advanced-cropper reference
// https://codesandbox.io/s/yrxou?file=/src/App.vue:0-2840

import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      cropped: [],
      image: {
        src: "",
        type: "image/jpg",
      },
    };
  },
  methods: {
    cropImage() {
      const result = this.$refs.cropper.getResult();
      this.cropped.push({
        id: Math.random(),
        image: result.canvas.toDataURL(this.image.type),
      });
      this.emitCropped(this.cropped)
    },
    
    // When image is cropped send to the parent component
    emitCropped(crop) {
      this.$emit("cropped-image", crop);
      this.cropped = [];
      this.image.src = "";
      this.$refs.file.value = ''
    },
    
    uploadImage(event) {
      /// Reference to the DOM input element
      const { files } = event.target;
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);

        // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
        this.image = {
          src: blob,
          type: files[0].type,
        };
      }
    },
  },
};
</script>

<style lang="scss">
#images {
  .cropper {
    max-height: 500px;
  }
  
  input {
    display: none;
  }
}
</style>
