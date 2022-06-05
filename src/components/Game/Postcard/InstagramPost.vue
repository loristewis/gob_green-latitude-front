<template>
  <CardContainer class="instagram-post">
    <div class="post-header">
      <img :src="GreenLatitude" />
      <p class="account">{{ account }}</p>
    </div>
    <Postcard :trip="trip" />
    <div class="post-content">
      <p class="post-caption">
        <span class="account">{{ account }}</span>
        <span class="caption">{{ caption }}</span>
      </p>
      <p class="post-hashtags">
        <span class="hashtag" v-for="(hashtag, i) in hashtags" :key="i">
          #{{ hashtag }}
        </span>
      </p>
      <ScoreContainer :small="true" :score="score" />
    </div>
  </CardContainer>
</template>

<script>
import {
  cleanString,
  getRandomElementsFromArray,
  getRandomFromArray,
} from '@/helpers'
import { instagramPost } from '@/constants'

import { CardContainer, ScoreContainer } from '@/components/lib'
import GreenLatitude from '@/assets/sticker-green-latitude.svg'

import Postcard from './Postcard.vue'

export default {
  name: 'InstagramPost',
  components: { CardContainer, ScoreContainer, Postcard },
  props: {
    trip: {
      type: Object,
      required: true,
    },
    score: {
      type: Object,
      required: true,
    },
    defeat: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      account: 'green-latitudezz',
      caption: 'caption',
      hashtags: ['yay', 'cavaetrelefeu'],
      GreenLatitude,
    }
  },
  mounted() {
    this.caption = this.getCaption()
    this.hashtags = this.getHashtags(4)
  },
  methods: {
    getHashtags(number) {
      const destination = this.trip.destination

      let hashtags = []
      let hashtagsPool = []

      hashtags.push(this.formatDestination(destination.title), 'hashtag')

      if (this.defeat != null) {
        hashtagsPool = [
          ...instagramPost.defeat.hashtags.global,
          ...instagramPost.defeat.hashtags[this.defeat],
        ]
        return [
          ...hashtags,
          ...getRandomElementsFromArray(hashtagsPool, number),
        ]
      } else {
        hashtagsPool = [
          ...instagramPost.victory.hashtags.global,
          ...instagramPost.victory.hashtags[destination.category],
        ]
        return [
          ...hashtags,
          ...getRandomElementsFromArray(hashtagsPool, number),
        ]
      }
    },
    getCaption() {
      const destination = this.trip.destination
      const wording = this.defeat
        ? instagramPost.defeat.caption
        : instagramPost.victory.caption

      let caption = ''

      let intro = 'enfin de retour de ::destination::...'
      intro = intro.replace(
        '::destination::',
        this.formatDestination(destination.title)
      )

      caption += cleanString(intro)
      caption += ' '

      caption += this.defeat
        ? getRandomFromArray(wording.text[this.defeat])
        : getRandomFromArray(wording.text[destination.category])

      return caption
    },
    formatDestination(destination, hashtag = false) {
      let result = destination
      if (hashtag) result = result.replace(' ', '')
      return result.toLowerCase()
    },
  },
}
</script>

<style lang="scss">
.instagram-post {
  .account {
    font-weight: bold;
  }

  .post-header {
    display: flex;
    align-items: center;
    padding: 12px 18px 8px 12px;

    .account {
      padding-left: 0.6em;
    }
  }

  .post-content {
    padding: 12px 18px 12px 14px;

    .post-caption {
      .caption {
        padding-left: 0.6em;
      }
    }

    .post-hashtags {
      padding: 12px 0;

      .hashtag {
        color: var(--color-hashtag);
      }
    }
  }
}
</style>
