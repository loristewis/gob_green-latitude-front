<template>
  <Container id="game-container">
    <!-- <div>
      <input
        type="checkbox"
        name="activities"
        v-model="divider"
        id="diviser"
        @change="store.calculateScore"
      />
      <label for="diviser"> Diviser les activités par deux</label>
    </div>
    <br /> -->

    <transition name="slide-in-out">
      <div
        class="slide-in-out"
        v-if="store.splash && getSplashScreen()"
        key="splash"
      >
        <SplashScreen :infos="getSplashScreen()" />
      </div>

      <div class="slide-in-out" v-else key="game">
        <div v-if="store.defeat != null && store.currentStep != 'postcard'">
          <DefeatContainer :infos="getDefeatInfos()" />
        </div>

        <Menu
          :displayScore="store.currentStep != 'postcard'"
          :score="store.score"
        />

        <transition name="fade" mode="out-in">
          <div class="thought-container" :key="store.thought">
            <Thought />
          </div>
        </transition>

        <component
          v-if="store.trip.wish"
          :is="store.currentComponent"
          :elements="this.elements[store.currentStep]"
          @validate-destination="validateDestination"
          @new-game="getWish"
        />
      </div>
    </transition>
  </Container>
</template>

<script>
import { getFromApi, getRandomInt, shuffleArray } from '@/helpers'
import { splashScreens, defeatPopup } from '@/constants'
import { useStore } from '@/store'
import { Container, Thought, Menu } from '@/components/lib'

import SplashScreen from './SplashScreen.vue'

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
  name: 'GameContainer',
  components: {
    SplashScreen,
    Container,
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

<style lang="scss">
#game-container {
  //position: fixed;

  > div {
    width: 100%;

    > div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
  }

  .thought-container {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    width: 100%;
    pointer-events: none;
    transition: 0.2s ease-in-out;
  }

  @include screen-sm {
    border: 1px solid #8a95b4;
    max-width: 375px;
    max-height: 800px;
  }
}

.grid {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px;
}
</style>
