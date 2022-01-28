<template>
  <div id="images-modal">
    <b-modal
      id="modal-center"
      centered
      ref="modal"
      title="Cropped Image"
      ok-title="Delete Image"
      hidden-title="Close"
      @ok="$emit('delete', true)"
    >
      <slot></slot>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="dark" @click="cancel()"> Cancel </b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="
            $emit('delete', true);
            cancel();
          "
        >
          Delete image
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
};
</script>

<style lang="scss">
#images-modal {
  .close {
    display: none;
  }
}
</style>
