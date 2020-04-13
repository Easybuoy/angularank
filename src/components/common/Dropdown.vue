<template>
  <div class="dropdown">
    <v-col class="d-flex" cols="12" sm="6">
      <v-select :items="dropdownItems" label="Filter" dense></v-select>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    dropdownItems: ['Contributions', 'Followers', 'Public Repos', 'Gists'],
  }),
};
</script>

<style>
.dropdown {
  display: flex;
  justify-content: center;
}
</style>
