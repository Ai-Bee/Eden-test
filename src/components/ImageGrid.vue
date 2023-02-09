<template>
  <div class="imgGrid">
    <div v-for="(image, index) in allImages" :key="index">
      <div class="child" :key="image">
        <!-- Lazy Load Logic -->
        <clazy-load :src="image">
          <transition name="fade">
            <img @click="navigateToSingleView(image)" :src="image" />
          </transition>
          <transition name="fade" slot="placeholder">
            <div slot="placeholder">
              <img
                @click="navigateToSingleView(image)"
                src="@/assets/logo.png"
              />
            </div>
          </transition>
        </clazy-load>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Images-Grid",
  mounted() {
    /**
     * calling this fetch method twice cause the api
     * only returns 50 images and we need 100
     */
    this.getRandomImages();
    this.getRandomImages();
  },
  computed: {
    ...mapGetters(["allImages"]),
  },
  methods: {
    ...mapActions(["getRandomImages", "setTempImage"]),
    navigateToSingleView(image) {
      this.setTempImage(image);
      this.$router.push("/single");
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.imgGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  max-width: 100vw;
  margin: 0;
  min-height: 100vh;
  .child {
    margin-top: 20px;
    img {
      max-height: 30em;
      max-width: 30em;
      min-height: 30%;
      cursor: pointer;
      transition: all 0.5s ease-in;
      border-radius: 5px;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
}

@media (prefers-color-scheme: dark) {
  .imgGrid {
    background-color: rgb(39, 39, 65);
  }
}
@media only screen and (max-width: 426px) {
  .imgGrid {
    .child {
      img {
        max-width: 20em;
      }
    }
  }
}
</style>
