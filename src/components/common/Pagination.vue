<template>
  <div class="text-center mb-5">
    <a href="#top">
      <v-pagination
        v-if="contributors.length > 0"
        v-model="customSelectedPage"
        :length="totalPages"
        :total-visible="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { paginateTotalPageNumber } from '../../utils';

export default {
  name: 'Pagination',
  data: () => ({
    totalPages: 1,
    customSelectedPage: 1,
  }),
  props: {
    contributors: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  computed: {
    ...mapGetters(['allContributors', 'paginatedContributors', 'selectedPage']),
  },
  mounted() {
    this.selectPage(this.page);
    this.customSelectedPage = this.selectedPage;
    const totalPage = paginateTotalPageNumber(this.contributors);
    this.totalPages = totalPage;
  },
  methods: {
    ...mapActions(['paginateContributors', 'selectPage']),
  },
  watch: {
    customSelectedPage(newPage) {
      this.selectPage(newPage);
      this.customSelectedPage = this.selectedPage;
      this.paginateContributors(newPage);
    },
  },
};
</script>

<style></style>
