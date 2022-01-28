<template>
  <div id="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      controls
      indicators
      background="white"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-for="(image, index) in images" :key="image.name">
        <b-carousel-slide
          :img-src="`${$helpers.apiUrl()}images/ad-id-${image.ad_id}/${image.name}`"
        >
          <div class="image-counter m-auto">
            <div class="d-flex justify-content-around align-items-center">
                <i class="fas fa-camera mlx-4"></i>
                <div>{{ ++index }} of {{ images.length }}</div>
            </div>
          </div>
        </b-carousel-slide>
      </div>
    </b-carousel>
  </div>
</template>

<script>
export default {
name: "Carousel",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  props: {
    images: {
      required: true,
      type: Array,
    },
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style lang="scss">
#carousel {
  .carousel-inner .carousel-item {
    transition: -webkit-transform 0s ease;
    transition: transform 0s ease;
    transition: transform 0s ease, -webkit-transform 0s ease;
  }
  
  .image-counter {
    border-radius: 3px;
    width: 80px;
    background-color: rgba(0, 0, 0, 0.708);
  }
}
</style>
