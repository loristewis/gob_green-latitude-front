<script>
import {
  getFromApi,
  getRandomInt,
  getRandomScore,
  getRandomFromArray,
} from '../helpers'

import { names } from './../constants/names.js'
import { splashScreens } from './../constants/splashScreens.js'

import { useStore } from './../store/index'

import ScoreComponent from './ScoreComponent.vue'
import SplashScreen from './SplashScreen.vue'

export default {
  name: 'ApiTest',
  components: {
    ScoreComponent,
    SplashScreen,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
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
    async getDestinationOptions(destination) {
      this.transports = await this.getTransports(destination.title, 4)
      console.log(this.transports)

      this.accommodations = await this.getAccommodations(destination.title, 10)
      console.log(this.accommodations)

      this.activities = await this.getActivities(destination.title, 10)
      console.log(this.activities)
    },
    async validateDestination() {
      if (this.store.trip.destination) {
        this.getDestinationOptions(this.store.trip.destination).then(
          this.moveToNextStep
        )
      } else {
        console.log('stp choisis une destination')
      }
    },
    async validateTransportation() {
      if (this.store.trip.transportation) {
        this.calculateScore()
        this.moveToNextStep()
      } else {
        console.log('stp choisis un transport')
      }
    },
    async validateAccommodation() {
      if (this.store.trip.accommodation) {
        this.calculateScore()
        this.moveToNextStep()
      } else {
        console.log('stp choisis un logement')
      }
    },
    async validateActivities() {
      if (this.store.activitiesCount === 3) {
        this.calculateScore()
        this.moveToNextStep()
      } else {
        console.log('stp choisis trois activités')
      }
    },
    moveToNextStep() {
      this.store.incrementProgressionIndex()
      this.store.displaySplashScreen()
    },
    getSplashScreen() {
      return splashScreens[this.store.currentStep]
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
        let replacement = ''
        if (match[1] === 'name') {
          replacement = this.store.trip.destination.country
            ? getRandomFromArray(names[this.store.trip.destination.country])
            : 'name'
        } else if (match[1] === 'destination') {
          replacement = this.store.trip[match[1]].title
        } else {
          replacement = '?'
        }
        text = text.replace(match[0], replacement)
      }
      return text
    },
    calculateScore() {
      this.score.wellness = 2
      this.score.budget = 10
      this.score.pollution = 0

      if (this.store.trip.transportation) {
        this.calculateTransportation()
      }
      if (this.store.trip.accommodation) {
        this.calculateAccomodation()
      }
      if (this.store.activitiesCount === 3) {
        this.calculateActivities()
      }
    },
    calculateTransportation() {
      const trip = this.store.trip

      this.score.wellness += trip.transportation.wellness
      this.score.pollution +=
        trip.destination.category === 'loin'
          ? trip.transportation.pollution * 2
          : trip.transportation.pollution
      this.score.budget -= trip.transportation.budget
    },
    calculateAccomodation() {
      const trip = this.store.trip

      this.score.wellness += trip.accommodation.wellness
      this.score.pollution += trip.accommodation.pollution
      this.score.budget -=
        trip.destination.category === 'cher'
          ? trip.accommodation.budget * 2
          : trip.accommodation.budget
    },
    calculateActivities() {
      const trip = this.store.trip

      console.log(trip.activities)

      for (const activity of trip.activities) {
        const wishes = activity.wishes.data.map((el) => el.attributes.title)

        let wellness = activity.wellness
        if (!wellness) {
          wellness = getRandomScore()
        }
        if (trip.destination.category === 'bof') {
          wellness = wellness / 2
        }
        if (!wishes.includes(trip.wish)) {
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
        @change="calculateScore"
      />
      <label for="diviser"> Diviser les activités par deux</label>
    </div>
    <br />

    <score-component :score="this.score"> </score-component>
    <br />

    <h3>Envie</h3>
    <p>{{ this.trip.wish }}</p>
    <br />

    <h3>Étape</h3>
    <p>{{ store.currentStep }}</p>
    <br />

    <div v-if="store.splash && getSplashScreen()">
      <splash-screen :infos="getSplashScreen()"></splash-screen>
    </div>
    <div v-else>
      <div class="grid">
        <div v-if="store.currentStep === 'destination'">
          <h3>Destination</h3>
          <select v-model="store.trip.destination">
            <option disabled value="">Destination</option>
            <option
              v-for="el in this.destinations"
              :value="el.attributes"
              :key="el.attributes.title"
            >
              {{ el.attributes.title }}
            </option>
          </select>
          <p @click="validateDestination">Let's go</p>
          <p v-if="store.trip.destination">
            <span>{{ store.trip.destination.category }}</span>
          </p>
        </div>

        <div v-if="store.currentStep === 'transportation'">
          <h3>Transport</h3>
          <select v-model="store.trip.transportation">
            <option disabled value="">Transport</option>
            <option
              v-for="el in this.transports"
              :value="el.attributes"
              :key="el.attributes.title"
            >
              {{ wording(el.attributes.title) }}
            </option>
          </select>
          <p @click="validateTransportation">Let's go</p>
          <div v-if="store.trip.transportation">
            <p>
              Bien-être :
              {{
                store.trip.transportation.wellness > 0
                  ? '+' + store.trip.transportation.wellness
                  : store.trip.transportation.wellness
              }}
            </p>
            <p>Budget : -{{ store.trip.transportation.budget }}</p>
            <p>Pollution : +{{ store.trip.transportation.pollution }}</p>
          </div>
        </div>

        <div v-if="store.currentStep === 'accommodation'">
          <h3>Hébergement</h3>
          <select v-model="store.trip.accommodation">
            <option disabled value="">Hébergement</option>
            <option
              v-for="el in this.accommodations"
              :value="el.attributes"
              :key="el.attributes.title"
            >
              {{ wording(el.attributes.title) }}
            </option>
          </select>
          <p @click="validateAccommodation">Let's go</p>
          <div v-if="store.trip.accommodation">
            <p>
              Bien-être :
              {{
                store.trip.accommodation.wellness > 0
                  ? '+' + store.trip.accommodation.wellness
                  : store.trip.accommodation.wellness
              }}
            </p>
            <p>Budget : -{{ store.trip.accommodation.budget }}</p>
            <p>Pollution : +{{ store.trip.accommodation.pollution }}</p>
          </div>
        </div>
      </div>

      <div v-if="store.currentStep === 'incidents'">
        <p @click="moveToNextStep">Skip</p>
      </div>

      <div v-if="store.currentStep === 'activities'">
        <h3>Activités</h3>
        <div v-for="el in this.activities" :key="el.attributes.id">
          <input
            type="checkbox"
            name="activities"
            v-model="store.trip.activities"
            :id="el.attributes.id"
            :value="el.attributes"
          />
          <label :for="el.attributes.id"
            >{{ ' ' }}{{ wording(el.attributes.title) }} <br /><span>{{
              el.attributes.wishes.data.map((el) => el.attributes.title)
            }}</span>
            <span style="opacity: 0.4"
              >(bien-être :
              {{ el.attributes.wellness ? el.attributes.wellness : '?' }} /
              budget : {{ el.attributes.budget }} / pollution :
              {{ el.attributes.pollution }})</span
            >
          </label>
        </div>
        <p @click="validateActivities">Let's go</p>
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
