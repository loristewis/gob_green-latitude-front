<script>
import { getFromApi } from '../helpers'

export default {
  name: 'ApiTest',
  data() {
    return {
      wishes: [],
      destinations: [],
      transports: [],
      accommodations: [],
      activities: [],
      trip: {
        wish: null,
        destination: null,
        transportation: null,
        accommodation: null,
        activities: [],
      },
      error: null,
    }
  },
  methods: {
    async setDestination() {
      this.transports = await this.getTransports(this.trip.destination.title, 4)
      console.log(this.transports)

      this.accommodations = await this.getAccommodations(
        this.trip.destination.title,
        10
      )
      console.log(this.accommodations)

      this.activities = await this.getActivities(
        this.trip.destination.title,
        10
      )
      console.log(this.activities)
    },
    async getTransports(destination, limit) {
      try {
        const transports = await getFromApi('/transports', {
          filters: {
            destinations: {
              title: {
                $eq: destination,
              },
            },
          },
        })
        transports.data.data.sort(() => 0.5 - Math.random())
        return transports.data.data.slice(0, limit)
      } catch (error) {
        this.error = error
      }
    },
    async getAccommodations(destination, limit) {
      try {
        const accommodations = await getFromApi('/accommodations', {
          filters: {
            destinations: {
              title: {
                $eq: destination,
              },
            },
          },
        })
        accommodations.data.data.sort(() => 0.5 - Math.random())
        return accommodations.data.data.slice(0, limit)
      } catch (error) {
        this.error = error
      }
    },
    async getActivities(destination, limit) {
      try {
        const activities = await getFromApi('/activities', {
          filters: {
            destinations: {
              title: {
                $eq: destination,
              },
            },
          },
        })
        activities.data.data.sort(() => 0.5 - Math.random())
        return activities.data.data.slice(0, limit)
      } catch (error) {
        this.error = error
      }
    },
    calculateScore() {
      console.log('calculate score')
      console.log(this.trip.destination)
      if (this.trip.destination.category === 'cher') {
        // on multiplie la pollution du transport par deux
      } else if (this.trip.destination.category === 'loin') {
        // on multiplie le coût du logement par deux
      } else if (this.trip.destination.category === 'bof') {
        // on divise le bien-être des activités par deux
      }
    },
  },
  async mounted() {
    console.log('mounted')
    try {
      const wishes = await getFromApi('/wishes', {})
      console.log(wishes.data.data)

      const destinations = await getFromApi('/destinations', {})
      console.log(destinations.data.data)

      this.wishes = wishes.data.data
      this.destinations = destinations.data.data

      this.trip.wish = this.wishes[0].attributes.title
    } catch (error) {
      this.error = error
    }
  },
}
</script>
<template>
  <div>
    <p>Envie : {{ this.trip.wish }}</p>

    <div v-if="this.trip.wish">
      <p>Destination ?</p>
      <select v-model="this.trip.destination" @change="setDestination">
        <option disabled value="">Destination</option>
        <option
          v-for="el in this.destinations"
          :value="el.attributes"
          :key="el.attributes.title"
        >
          {{ el.attributes.title }}
        </option>
      </select>
    </div>

    <div v-if="this.trip.destination">
      <p>Transport ?</p>
      <select v-model="this.trip.transportation">
        <option disabled value="">Transport</option>
        <option
          v-for="el in this.transports"
          :value="el.attributes"
          :key="el.attributes.title"
        >
          {{ el.attributes.title }}
        </option>
      </select>
    </div>

    <div v-if="this.trip.transportation">
      <p>Hébergement ?</p>
      <select v-model="this.trip.accommodation">
        <option disabled value="">Hébergement</option>
        <option
          v-for="el in this.accommodations"
          :value="el.attributes"
          :key="el.attributes.title"
        >
          {{ el.attributes.title }}
        </option>
      </select>
    </div>

    <div v-if="this.trip.accommodation">
      <p>Activités ?</p>
      <div v-for="el in this.activities" :key="el.attributes.id">
        <input
          type="checkbox"
          name="activities"
          v-model="this.trip.activities"
          :id="el.attributes.id"
          :value="el.attributes"
        />
        <label :for="el.attributes.id"
          >{{ ' ' }}{{ el.attributes.title }}</label
        >
      </div>
    </div>

    <div v-if="this.trip.activities.length === 3">
      <p>Calcul</p>
    </div>
  </div>
</template>
<style scoped></style>
