<template>
  <div class="arrowUp" @click="scrollToTop">
    <img
      src="@/assets/rotation.png"
      @click.prevent="refreshData"
      class="left"
      alt="refresh"
    />
    <img src="@/assets/up-arrow.png" class="right Arrow up" />
  </div>
</template>

<script>
import { eventBus } from "@/main";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["clearRandomImagesFromDB", "getRandomImages"]),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    refreshData() {
      this.clearRandomImagesFromDB();
      this.getRandomImages();
      eventBus.$emit("clearInputField");
    },
  },
};
</script>

<style lang="scss" scoped>
.arrowUp {
  img {
    position: fixed;
    display: flex;
    background-color: bisque;
    widows: 45px;
    height: 45px;
    border-radius: 5px;
    padding: 12px;
    cursor: pointer;
  }
  img.right {
    bottom: 30px;
    right: 30px;
  }
  img.left {
    bottom: 30px;
    left: 30px;
  }
}
</style>
