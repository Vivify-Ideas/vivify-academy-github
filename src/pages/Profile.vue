<template>
  <v-ons-page>
    <app-toolbar :title="user.login">
      <template slot="left">
        <v-ons-back-button></v-ons-back-button>
      </template>
    </app-toolbar>
    <v-ons-card>
      <img :src="user.avatar_url" alt="Avatar" style="width: 100%">
      <div class="title">
        {{ user.login }}
      </div>
      <div class="content">
        <v-ons-list>
          <v-ons-list-header>Profile Details</v-ons-list-header>
          <v-ons-list-item>Location: {{ user.location }}</v-ons-list-item>
          <v-ons-list-item>Following: {{ user.following }}</v-ons-list-item>
          <v-ons-list-item>Followers: {{ user.followers }}</v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import AppToolbar from '../components/AppToolbar.vue'
import { gitHub } from '../services'

export default {

  components: {
    AppToolbar
  },

  props: {
    username: {
      type: String
    }
  },

  data () {
    return {
      user: {}
    }
  },

  mounted () {
    gitHub.getUser(this.username)
      .then((response) => {
        this.user = response.data
      })
  }
}
</script>
