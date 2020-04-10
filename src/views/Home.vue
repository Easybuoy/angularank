<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['allOrganizations'])
  },
  methods: {
    ...mapActions(['getOrganizations'])
  },
  created() {
    console.log('aa');
    this.getOrganizations();
  }
};
</script>
