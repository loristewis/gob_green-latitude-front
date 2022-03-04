<template>
  <h1>activities</h1>
  <pre>
    {{ activities }}
  </pre>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ApiTest',
  data () {
    return {
      activities: [],
      error: null
    }
  },
  async mounted () {
    try {
      const response = await axios.get('/activities', {
        baseURL: 'http://localhost:1337/api'
      })
      console.log(response)

      this.activities = response.data.data
    } catch (error) {
      this.error = error;
    }
  }
}
</script>
