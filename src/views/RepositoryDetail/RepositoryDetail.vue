<template>
  <h1>HHH</h1>
</template>

<script>
export default {
  name: 'Repository_Detail',
  created() {
    const { login, repo_name } = this.$route.params;
    console.log(login, repo_name);
  }
};
</script>

<style scoped lang="less">
</style>