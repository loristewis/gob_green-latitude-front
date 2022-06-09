<template>
  <transition name="slide-in-out">
    <div
      v-if="store.splash && getSplashScreen()"
      class="slide-in-out"
      key="splash"
    >
      <SplashScreen :infos="getSplashScreen()" />
    </div>

    <div v-else class="slide-in-out" key="game">
      <component
        v-if="store.trip.wish"
        :is="store.currentComponent"
        :elements="this.elements[store.currentStep]"
        @validate-destination="validateDestination"
        @new-game="getWish"
      />

      <div v-if="store.defeat != null && store.currentStep != 'postcard'">
        <DefeatContainer v-if="defeatModal()" :infos="getDefeatInfos()" />
      </div>

      <transition name="fade" mode="out-in">
        <Thought :key="store.thought" />
      </transition>
    </div>
  </transition>
</template>

<script>
import { getFromApi, getRandomInt, shuffleArray } from '@/helpers'
import { splashScreens, defeatPopup } from '@/constants'
import { useStore } from '@/store'

import { Container, Thought } from '@/components/lib'

import SplashScreen from '@/components/SplashScreen.vue'

import {
  AnimationContainer,
  PrescriptionContainer,
  DestinationContainer,
  TransportationContainer,
  AccommodationContainer,
  IncidentContainer,
  ActivitiesContainer,
  DefeatContainer,
  PostcardContainer,
} from '@/components/Game'

export default {
  name: 'Game',
  components: {
    SplashScreen,
    Container,
    Thought,
    AnimationContainer,
    PrescriptionContainer,
    DestinationContainer,
    TransportationContainer,
    AccommodationContainer,
    IncidentContainer,
    ActivitiesContainer,
    DefeatContainer,
    PostcardContainer,
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
    defeatModal() {
      return this.store.defeat != null && this.store.currentStep != 'postcard'
    },
    getWish() {
      this.store.trip.wish = this.wishes[getRandomInt(7)].attributes.title
    },
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
            incidents: {
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
            incidents: {
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
          populate: '*',
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
          incidents: {
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

      this.getWish()
    } catch (error) {
      this.error = error
    }
  },
}
</script>
