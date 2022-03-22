<template>
  <h1>activities</h1>
  <pre>
    {{ activities }}
  </pre>
</template>

<script>
import {getFromApi} from '../helpers';

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
      const response = await getFromApi('/activities')
      console.log(response)

      this.activities = response.data.data
    } catch (error) {
      this.error = error;
    }
  }
}
</script>
