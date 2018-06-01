<template>
  <v-ons-navigator :page-stack="pageStack" @push-page="pushPage" />
</template>

<script>
import Home from './pages/Home.vue'

export default {
  data () {
    return {
      pageStack: [Home]
    }
  },

  methods: {
    pushPage (page) {
      this.pageStack.push(page)
    }
  }
}
</script>
