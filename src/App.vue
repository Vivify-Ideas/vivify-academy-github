<template>
    <v-ons-page>
      <app-toolbar />
      <div class="content">
        <app-search :query.sync="query" placeholder="Search by username"/>
        <v-ons-progress-circular class="loader" indeterminate v-if="isFetching"/>
        <v-ons-list v-if="!isFetching && query">
          <v-ons-list-header>Repositories of {{ query }}</v-ons-list-header>
          <v-ons-list-item tappable v-for="repo in repos" :key="repo.id">
            <div class="left">
              <img class="list-item__thumbnail" :src="repo.owner.avatar_url">
            </div>
            <div class="center">
              <span class="list-item__title">{{ repo.name }}</span>
              <span class="list-item__subtitle">{{ repo.description }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
        <empty-state v-if="!isFetching && !repos.length" type="repository" />
      </div>
    </v-ons-page>
</template>

<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar.vue'
import AppSearch from './components/AppSearch.vue'
import EmptyState from './components/EmptyState.vue'
import { gitHub } from './services'

export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState
  },

  data () {
    return {
      query: '',
      repos: [],
      isFetching: false
    }
  },

  methods: {
    getRepos: debounce(function () {
      this.toggleFetching()
      gitHub.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
        }).finally(() => {
          this.toggleFetching()
        })
    }, 500),

    toggleFetching () {
      this.isFetching = !this.isFetching
    }
  },

  watch: {
    query (value) {
      this.getRepos(value)
    }
  }
}
</script>

<style scoped>
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
