<template>
  <div id="main-container">
    <div>
      <input
        type="checkbox"
        name="activities"
        v-model="divider"
        id="diviser"
        @change="store.calculateScore"
      />
      <label for="diviser"> Diviser les activités par deux</label>
    </div>
    <br />

    <div v-if="store.defeat">
      <DefeatContainer :infos="getDefeatInfos()" />
    </div>

    <div v-if="store.splash && getSplashScreen()">
      <SplashScreen :infos="getSplashScreen()" />
    </div>

    <div v-else>
      <score-component :score="store.score"> </score-component>
      <Menu :score="store.score" />
      <br />

      <h3>Envie</h3>
      <p>{{ store.trip.wish }}</p>
      <br />

      <h3>Étape</h3>
      <p>{{ store.currentStep }}</p>
      <br />
      <Thought v-if="store.activeThought">{{ store.activeThought }}</Thought>
      <component
        :is="store.currentComponent"
        :elements="this.elements[store.currentStep]"
        @validate-destination="validateDestination"
      ></component>
    </div>
  </div>
</template>

<script>
import { getFromApi, getRandomInt, shuffleArray } from '../helpers'

import { splashScreens, defeatPopup } from '../constants'

import { useStore } from './../store'

import ScoreComponent from './ScoreComponent.vue'
import SplashScreen from './SplashScreen.vue'

import { Thought, Menu } from './lib'

import {
  AnimationContainer,
  PrescriptionContainer,
  DestinationContainer,
  TransportationContainer,
  AccommodationContainer,
  IncidentContainer,
  ActivitiesContainer,
  DefeatContainer,
} from './Game'

export default {
  name: 'MainContainer',
  components: {
    ScoreComponent,
    SplashScreen,
    Thought,
    Menu,
    AnimationContainer,
    PrescriptionContainer,
    DestinationContainer,
    TransportationContainer,
    AccommodationContainer,
    IncidentContainer,
    ActivitiesContainer,
    DefeatContainer,
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
      elements: {
        destination: [],
        transportation: [],
        accommodation: [],
        activities: [],
      },
      error: null,
    }
  },
  methods: {
    getSplashScreen() {
      return splashScreens[this.store.currentStep]
    },
    getDefeatInfos() {
      return defeatPopup[this.store.defeat]
    },
    async validateDestination() {
      if (this.store.trip.destination) {
        this.store.collectPotentialIncidents(this.store.trip.destination)
        this.getDestinationOptions(this.store.trip.destination).then(
          this.store.moveToNextStep
        )
      } else {
        console.log('stp choisis une destination')
      }
    },
    async getDestinationOptions(destination) {
      this.elements.transportation = await this.getTransports(
        destination.title,
        4
      )
      console.log(this.elements.transportation)

      this.elements.accommodation = await this.getAccommodations(
        destination.title,
        10
      )
      console.log(this.elements.accommodation)

      this.elements.activities = await this.getActivities(destination.title, 10)
      console.log(this.elements.activities)
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
          populate: {
            options: {
              fields: [
                'title',
                'description',
                'tagline',
                'budget',
                'wellness',
                'pollution',
              ],
              populate: '*',
            },
            events: {
              populate: {
                choices: {
                  populate: '*',
                },
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
          populate: {
            image: '*',
            events: {
              populate: {
                choices: {
                  populate: '*',
                },
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
          return wishes.includes(this.store.trip.wish)
        })

        const otherActivities = activities.data.data.filter((el) => {
          const wishes = el.attributes.wishes.data.map(
            (wish) => wish.attributes.title
          )
          return !wishes.includes(this.store.trip.wish)
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
  },
  async mounted() {
    console.log('mounted')
    try {
      const wishes = await getFromApi('/wishes', {})
      console.log(wishes.data.data)

      const destinations = await getFromApi('/destinations', {
        populate: {
          image: '*',
          events: {
            populate: {
              choices: {
                populate: '*',
              },
            },
          },
        },
      })
      console.log(destinations.data.data)

      this.wishes = wishes.data.data
      this.elements.destination = shuffleArray(destinations.data.data)

      this.store.trip.wish = this.wishes[getRandomInt(7)].attributes.title
    } catch (error) {
      this.error = error
    }
  },
}
</script>

<style lang="scss" scoped>
#main-container {
  margin: auto;
  max-width: 375px;
  overflow-x: hidden;
  background-color: var(--color-background);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
}
</style>
