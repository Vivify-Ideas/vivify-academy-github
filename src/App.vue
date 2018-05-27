<template>
    <v-ons-page>
      <app-toolbar />
      <div class="page">
        <app-search :query.sync="query" placeholder="Search by username"/>
      </div>
    </v-ons-page>
</template>

<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar.vue'
import AppSearch from './components/AppSearch.vue'
import { gitHub } from './services'

export default{
  components: {
    AppToolbar,
    AppSearch
  },

  data () {
    return {
      query: '',
      repos: []
    }
  },

  methods: {
    getRepos: debounce(function () {
      gitHub.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
        })
    }, 500)
  },

  watch: {
    query (value) {
      this.getRepos(value)
    }
  }
}
</script>

<style scoped>
  .page {
    padding: 10px;
  }
</style>
