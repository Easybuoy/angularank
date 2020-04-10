<template>
  <div class="home">
    <h1>Mee</h1>
    <div>
       {{ allOrganizations }}
      <h1 v-for="item in allOrganizations" :key="item.id">
        {{ item.login }}
      </h1>
    </div>
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
    console.log(this.allOrganizations, ' ye');
  }
};
</script>
