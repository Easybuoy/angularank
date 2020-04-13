<template>
  <div>
    <div class="text-center d-flex justify-center align-center spinner" v-if="loading">
      <v-progress-circular
        :size="50"
        :width="5"
        color="red accent-4"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else-if="error !== null" class="err mt-5">
      <v-alert type="error" dismissible="true">{{ error }}</v-alert>

      <a @click="this.reloadPage">
        <v-btn class="ma-2" tile color="success" dark>Reload Page</v-btn>
      </a>
    </div>

    <div v-else>
      {{ userDetail }}
      <v-img
        :src="userDetail.avatar_url"
        :lazy-src="userDetail.avatar_url"
        aspect-ratio="1"
        class="grey lighten-2"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'User-Details',
  created() {
    const { login } = this.$route.params;
    this.getUserDetail(login);
    console.log(this.userDetail, 'userd');
  },
  computed: {
    ...mapGetters(['userDetail', 'loading', 'error'])
  },
  methods: {
    ...mapActions(['getUserDetail'])
  }
};
</script>

<style></style>
