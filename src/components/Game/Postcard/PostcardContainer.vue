<template>
  <GameLayout class="endscreen">
    <template #default>
      <CardContainer class="endscreen-bubble">
        <Sticker class="endscreen-bubble-title" :theme="bubbleInfos.theme">
          {{ bubbleInfos.title }}
        </Sticker>

        <p>{{ bubbleInfos.description }}</p>
      </CardContainer>

      <InstagramPost
        :score="store.score"
        :trip="store.trip"
        :defeat="store.defeat"
      />
    </template>

    <template #footer>
      <Button class="endscreen-button" simple @click="newGame">
        Nouvelle partie ?
      </Button>

      <GradientOverlay />
    </template>
  </GameLayout>
</template>

<script>
import { useStore } from '@/store'
import { endScreen } from '@/constants'

import {
  CardContainer,
  Button,
  Sticker,
  GradientOverlay,
} from '@/components/lib'
import InstagramPost from './InstagramPost.vue'

import GameLayout from '@/components/GameLayout.vue'

export default {
  name: 'PostcardContainer',
  components: {
    CardContainer,
    Button,
    Sticker,
    InstagramPost,
    GameLayout,
    GradientOverlay,
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  data() {
    return {
      bubbleInfos: this.store.defeat ? endScreen.defeat : endScreen.victory,
    }
  },
  mounted() {
    if (this.store.soundon) {
      if (this.store.defeat) {
        this.store.audio.defeat.play()
      } else {
        this.store.audio.victory.play()
      }
    }
  },
  methods: {
    newGame() {
      console.log('nouvelle partie !')
      this.store.skipIntro = true
      this.store.resetState()
      this.$emit('new-game')
    },
  },
}
</script>

<style lang="scss">
.endscreen {
  header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 96px;
    background: linear-gradient(to top, transparent, var(--color-beige-cool));
    z-index: 4;
  }

  main {
    //height: calc(100% - 90px);
    height: 100%;
    padding-top: 80px;
    padding-bottom: 96px;
    overflow: scroll;
  }

  //main {
  //  overflow: scroll;
  //}
  //
  //&-wrapper {
  //  padding: 0 24px 16px;
  //}

  &-bubble {
    margin: 32px 24px 16px;
    padding: 12px 18px 12px 16px;
    position: relative;

    &-title {
      position: absolute;
      top: -24px;
      left: -12px;
      transform: rotate(-3deg);
    }
  }

  &-button {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
}
</style>
