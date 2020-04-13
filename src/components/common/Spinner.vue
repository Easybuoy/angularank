<template>
  <div class="spinner">
    <v-progress-circular
      :size="50"
      :width="5"
      color="red accent-4"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
};
</script>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
