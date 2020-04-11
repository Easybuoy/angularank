<template>
  <div>
    {{ this.userDetail }}
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
    ...mapGetters(['userDetail'])
  },
  methods: {
    ...mapActions(['getUserDetail'])
  }
};
</script>

<style></style>
