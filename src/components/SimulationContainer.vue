<script>
import { getFromApi, getRandomInt, getRandomScore } from '../helpers'
import ScoreComponent from './ScoreComponent.vue'

export default {
  name: 'ApiTest',
  components: {
    ScoreComponent,
  },
  data() {
    return {
      divider: false,
      wishes: [],
      destinations: [],
      transports: [],
      accommodations: [],
      activities: [],
      score: {
        wellness: 2,
        budget: 10,
        pollution: 0,
      },
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

        const wishActivities = activities.data.data.filter((el) => {
          const wishes = el.attributes.wishes.data.map(
            (wish) => wish.attributes.title
          )
          return wishes.includes(this.trip.wish)
        })

        const otherActivities = activities.data.data.filter((el) => {
          const wishes = el.attributes.wishes.data.map(
            (wish) => wish.attributes.title
          )
          return !wishes.includes(this.trip.wish)
        })

        let allActivities = [
          ...wishActivities.slice(0, Math.floor(limit * 0.6)),
          ...otherActivities,
        ].slice(0, limit)

        return allActivities.sort(() => 0.5 - Math.random())
      } catch (error) {
        this.error = error
      }
    },
    wording(text) {
      const match = text.match('::(.*)::')
      if (match) {
        console.log('match!')
        const replacement = this.trip[match[1]]
          ? this.trip[match[1]].title
          : '?'
        text = text.replace(match[0], replacement)
        console.log(text)
      }
      return text
    },
    calculateScore() {
      this.score.wellness = 2
      this.score.budget = 10
      this.score.pollution = 0

      if (this.trip.transportation) {
        this.calculateTransportation()
      }
      if (this.trip.accommodation) {
        this.calculateAccomodation()
      }
      if (this.trip.activities.length > 0) {
        this.calculateActivities()
      }
    },
    calculateTransportation() {
      this.score.wellness += this.trip.transportation.wellness
      this.score.pollution +=
        this.trip.destination.category === 'loin'
          ? this.trip.transportation.pollution * 2
          : this.trip.transportation.pollution
      this.score.budget -= this.trip.transportation.budget
    },
    calculateAccomodation() {
      this.score.wellness += this.trip.accommodation.wellness
      this.score.pollution += this.trip.accommodation.pollution
      this.score.budget -=
        this.trip.destination.category === 'cher'
          ? this.trip.accommodation.budget * 2
          : this.trip.accommodation.budget
    },
    calculateActivities() {
      console.log(this.trip.activities)
      console.log('divider')
      console.log(this.divider)

      for (const activity of this.trip.activities) {
        const wishes = activity.wishes.data.map((el) => el.attributes.title)

        let wellness = activity.wellness
        if (!wellness) {
          wellness = getRandomScore()
        }
        if (this.trip.destination.category === 'bof') {
          wellness = wellness / 2
        }
        if (!wishes.includes(this.trip.wish)) {
          wellness = wellness / 2
        } else {
          wellness = wellness * 2
        }

        this.score.wellness += this.divider ? wellness / 2 : wellness
        this.score.pollution += this.divider
          ? activity.pollution / 2
          : activity.pollution
        this.score.budget -= this.divider
          ? activity.budget / 2
          : activity.budget
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

      this.trip.wish = this.wishes[getRandomInt(7)].attributes.title
    } catch (error) {
      this.error = error
    }
  },
}
</script>
<template>
  <div>
    <div>
      <input
        type="checkbox"
        name="activities"
        v-model="divider"
        id="diviser"
        @change="this.calculateScore"
      />
      <label for="diviser"> Diviser les activités par deux</label>
    </div>
    <br />

    <score-component :score="this.score"> </score-component>
    <br />

    <h3>Envie</h3>
    <p>{{ this.trip.wish }}</p>
    <br />

    <div class="grid">
      <div v-if="this.trip.wish">
        <h3>Destination</h3>
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
        <p v-if="this.trip.destination">
          <span>{{ this.trip.destination.category }}</span>
        </p>
      </div>
      <div v-if="this.trip.destination">
        <h3>Transport</h3>
        <select
          v-model="this.trip.transportation"
          @change="this.calculateScore"
        >
          <option disabled value="">Transport</option>
          <option
            v-for="el in this.transports"
            :value="el.attributes"
            :key="el.attributes.title"
          >
            {{ el.attributes.title }}
          </option>
        </select>
        <div v-if="this.trip.transportation">
          <p>
            Bien-être :
            {{
              this.trip.transportation.wellness > 0
                ? '+' + this.trip.transportation.wellness
                : this.trip.transportation.wellness
            }}
          </p>
          <p>Budget : -{{ this.trip.transportation.budget }}</p>
          <p>Pollution : +{{ this.trip.transportation.pollution }}</p>
        </div>
      </div>
      <div v-if="this.trip.transportation">
        <h3>Hébergement</h3>
        <select v-model="this.trip.accommodation" @change="this.calculateScore">
          <option disabled value="">Hébergement</option>
          <option
            v-for="el in this.accommodations"
            :value="el.attributes"
            :key="el.attributes.title"
          >
            {{ wording(el.attributes.title) }}
          </option>
        </select>
        <div v-if="this.trip.accommodation">
          <p>
            Bien-être :
            {{
              this.trip.accommodation.wellness > 0
                ? '+' + this.trip.accommodation.wellness
                : this.trip.accommodation.wellness
            }}
          </p>
          <p>Budget : -{{ this.trip.accommodation.budget }}</p>
          <p>Pollution : +{{ this.trip.accommodation.pollution }}</p>
        </div>
      </div>
    </div>

    <br />

    <div v-if="this.trip.accommodation">
      <h3>Activités</h3>
      <div v-for="el in this.activities" :key="el.attributes.id">
        <input
          type="checkbox"
          name="activities"
          v-model="this.trip.activities"
          @change="this.calculateScore"
          :id="el.attributes.id"
          :value="el.attributes"
        />
        <label :for="el.attributes.id"
          >{{ ' ' }}{{ wording(el.attributes.title) }} <br /><span>{{
            el.attributes.wishes.data.map((el) => el.attributes.title)
          }}</span>
          <span style="opacity: 0.4"
            >(bien-être :
            {{ el.attributes.wellness ? el.attributes.wellness : '?' }} / budget
            : {{ el.attributes.budget }} / pollution :
            {{ el.attributes.pollution }})</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
}
</style>
