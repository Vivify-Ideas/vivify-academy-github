<template>
    <v-ons-page>
      <app-toolbar />
      <div class="content">
        <app-search :query.sync="query" placeholder="Search by username"/>
        <v-ons-list v-if="query">
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
      </div>
    </v-ons-page>
</template>

<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar.vue'
import AppSearch from './components/AppSearch.vue'
import { gitHub } from './services'

export default {
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
