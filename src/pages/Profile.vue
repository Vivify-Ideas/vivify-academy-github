<template>
  <v-ons-page>
    <app-toolbar :title="user.login">
      <template slot="left">
        <v-ons-back-button />
      </template>
    </app-toolbar>
    <div class="content">
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
      <v-ons-card>
        <div class="title">
          <v-ons-input v-model="note.content" placeholder="Enter a note..."/>
          <v-ons-button modifier="cta" @click="addNote">Add Note</v-ons-button>
        </div>
        <div class="content">
          <v-ons-list v-if="notes.length">
            <v-ons-list-header>Notes</v-ons-list-header>
            <v-ons-list-item v-for="(note, index) in notes" :key="index">
              {{ note.content }}
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-card>
    </div>
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
      user: {},
      notes: [],
      note: {
        content: '',
        userId: ''
      }
    }
  },

  methods: {
    addNote () {
      this.notes.push(Object.assign({}, this.note)) // Push a clone of this.note insted of actual one
      const allNotes = JSON.parse(localStorage.getItem('notes'))
      allNotes.push(Object.assign({}, this.note))
      localStorage.setItem('notes', JSON.stringify(allNotes))

      this.note.content = ''
    }
  },

  mounted () {
    gitHub.getUser(this.username)
      .then((response) => {
        this.user = response.data
        this.note.userId = this.user.id
        if (localStorage.getItem('notes')) {
          this.notes = JSON.parse(localStorage.getItem('notes')).filter(note => note.userId === this.user.id)
        }
      })
  }
}
</script>
