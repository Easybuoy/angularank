<template>
  <v-app>
    <Navigation />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navigation from '@/components/common/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    //
  })
};
</script>
