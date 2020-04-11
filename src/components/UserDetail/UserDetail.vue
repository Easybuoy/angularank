<template> </template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'User-Details',
 
  created() {
    this.login = this.$route.params.id;
    // this.getMovieDetails();
  }
};
</script>

<style></style>
