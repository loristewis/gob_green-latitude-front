<template>
  <div class="endscreen">
    <CardContainer class="endscreen-bubble">
      <Sticker class="endscreen-bubble-title" :theme="bubbleInfos.theme">{{
        bubbleInfos.title
      }}</Sticker>
      <p>{{ bubbleInfos.description }}</p>
    </CardContainer>
    <InstagramPost
      :score="store.score"
      :trip="store.trip"
      :defeat="store.defeat"
    />
    <Button simple @click="newGame">Nouvelle partie ?</Button>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { endScreen } from '@/constants'

import { CardContainer, Button, Sticker } from '@/components/lib'
import InstagramPost from './InstagramPost.vue'

export default {
  name: 'PostcardContainer',
  components: { CardContainer, Button, Sticker, InstagramPost },
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
  padding: 0 20px;
  padding-bottom: 16px;

  &-bubble {
    padding: 12px 18px 12px 16px;
    margin-bottom: 16px;
    position: relative;

    &-title {
      position: absolute;
      top: -24px;
      left: -12px;
      transform: rotate(-3deg);
    }
  }
}
</style>
