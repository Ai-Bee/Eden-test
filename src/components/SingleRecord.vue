<template>
  <div class="imgSingle">
    <img :src="imageLink" alt="random image" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Image-view",
  computed: {
    ...mapGetters(["singleView"]),
    imageLink() {
      if (this.singleView) {
        return this.singleView;
      } else {
        // This is needed in cases where
        // the user refreshes the page
        return localStorage.getItem("tempImage");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.imgSingle {
  display: flex;
  margin: 13vh 20vw;
  justify-content: center;
  img {
    max-height: 45em;
    max-width: 45em;
  }
}

@media only screen and (max-width: 426px) {
  .imgSingle {
    img {
      max-width: 20em;
    }
  }
}
</style>
