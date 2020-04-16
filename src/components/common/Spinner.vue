<template>
  <div class="spinner">
    <v-progress-circular
      :size="50"
      :width="5"
      color="red accent-4"
      indeterminate
    ></v-progress-circular>
    <p class="red--text text--darken-4">Be patient. Everything is coming together.</p>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style lang="less">
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20rem 0;

  p {
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: 'Concert One', cursive;
    margin: 0.5rem 0;
  }
}
</style>
