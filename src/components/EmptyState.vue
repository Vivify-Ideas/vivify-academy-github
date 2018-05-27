<template>
  <v-ons-card>
    <img src="https://pbs.twimg.com/media/Bt5MoW0CIAE9Fda.jpg" alt="Empty" style="width: 100%">
    <div class="content">
      There are no {{ type | pluralize }} here
    </div>
  </v-ons-card>
</template>

<script>
import pluralize from 'pluralize'

export default {
  props: {
    type: String
  },

  filters: {
    pluralize (value) {
      return pluralize(value)
    }
  }
}
</script>
