<template>
  <div class="bodySection">
    <button class="button-grey" @click="navigateBack">Back</button>
    <img
      src="@/assets/rotation.png"
      @click.prevent="refreshData"
      class="left"
      alt="refresh"
    />
    <SingleRecord />
  </div>
</template>

<script>
import SingleRecord from "@/components/SingleRecord.vue";

export default {
  name: "Single-view",
  components: { SingleRecord },
  methods: {
    navigateBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.bodySection {
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  img.left {
    position: fixed;
    bottom: 30px;
    left: 30px;
    display: flex;
    background-color: bisque;
    widows: 30px;
    height: 30px;
    border-radius: 5px;
    padding: 12px;
    cursor: pointer;
  }
}

.button-grey {
  margin: 25px;
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border: 2px solid #495057;
  background: #495057;
}
.button-grey:hover {
  background: #fff;
  color: #495057;
}

@media (prefers-color-scheme: dark) {
  * {
    background-color: rgb(39, 39, 65);
  }
}
</style>
