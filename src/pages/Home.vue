<template>
    <v-ons-page>
      <app-toolbar />
      <div class="content">
        <app-search :query.sync="query" placeholder="Search by username"/>
        <v-ons-progress-circular class="loader" indeterminate v-if="isFetching"/>
        <not-found v-if="show404" />
        <v-ons-list v-if="showList">
          <v-ons-list-header>
            Repositories of {{ query }}
          </v-ons-list-header>
          <v-ons-button modifier="large cta" @click="goToUserProfile">View Profile</v-ons-button>
          <v-ons-list-item tappable v-for="repo in repos" :key="repo.id" v-if="repos.length">
            <div class="left">
              <img class="list-item__thumbnail" :src="repo.owner.avatar_url">
            </div>
            <div class="center">
              <span class="list-item__title">{{ repo.name }}</span>
              <span class="list-item__subtitle">{{ repo.description }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
        <empty-state v-if="showEmptyState" type="repository" />
      </div>
    </v-ons-page>
</template>

<script>
import debounce from 'lodash/debounce'
import AppToolbar from '../components/AppToolbar.vue'
import AppSearch from '../components/AppSearch.vue'
import EmptyState from '../components/EmptyState.vue'
import NotFound from '../components/404.vue'
import Profile from './Profile.vue'
import { gitHub } from '../services'

export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState,
    NotFound
  },

  data () {
    return {
      query: '',
      repos: [],
      isFetching: false,
      notFound: false
    }
  },

  methods: {
    getRepos: debounce(function () {
      this.notFound = false
      gitHub.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
        }).catch((error) => {
          if ( error.response.status === 404 ) {
            this.notFound = true
            this.repos = []
          }
        }).finally(() => {
          this.isFetching = false
        })
    }, 500),

    goToUserProfile () {
      this.$emit('push-page', {
        extends: Profile,
        onsNavigatorProps: {
          username: this.query
        }
      })
    }
  },

  watch: {
    query (value) {
      this.isFetching = true
      this.getRepos(value)
    }
  },

  computed: {
    showEmptyState () {
      return this.query && !this.notFound && !this.isFetching && !this.repos.length
    },

    show404 () {
      return this.notFound && !this.isFetching
    },

    showList () {
      return this.query && !this.notFound && !this.isFetching && this.repos.length
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
