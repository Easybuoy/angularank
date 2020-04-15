<template>
  <div v-if="error !== null" class="err mt-5">
    <v-alert type="error" dismissible="true">{{ error }}</v-alert>

    <a @click="this.reloadPage">
      <v-btn class="ma-2" tile color="success" dark>Reload Page</v-btn>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: String,
      required: true,
      default: null,
    },
  },
  methods: {
    reloadPage() {
      return window.location.reload();
    },
  },
};
</script>

<style>
.err {
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
