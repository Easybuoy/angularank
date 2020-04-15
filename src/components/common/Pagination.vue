<template>
  <div class="text-center">
    <v-pagination
      v-if="this.page"
      v-model="this.selectedPage"
      :length="this.totalPages"
      :total-visible="5"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    selectedPageData: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data: () => ({
    selectedPage: 1
  }),
  mounted() {
    this.selectedPage = this.page;
  },
  watch: {
    selectedPage: function(newPage) {
        console.log(newPage)
    //   this.getNewPage(newPage);
    }
  }
};
</script>

<style></style>
