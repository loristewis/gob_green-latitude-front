<template>
  <CardContainer class="defeat-container" :class="infos.type">
    <Sticker class="defeat-container-title" theme="rose" big>{{
      infos.title
    }}</Sticker>
    <p
      class="defeat-container-text"
      :style="{
        paddingTop: infos.type === 'pollution' ? 72 + 'px' : 32 + 'px',
      }"
    >
      {{ infos.description }}
    </p>
    <img :src="infos.image" alt="" />
    <Button class="defeat-container-button" simple @click="finishGame"
      >Voir le bilan de fin</Button
    >
  </CardContainer>
</template>

<script>
import { useStore } from '@/store'
import { defeatPopup } from '@/constants'
import { CardContainer, Sticker, Button } from '@/components/lib'

export default {
  name: 'DefeatModal',
  components: {
    CardContainer,
    Sticker,
    Button,
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      infos: defeatPopup[this.store.defeat],
    }
  },
  methods: {
    finishGame() {
      this.store.moveToStep('animation-end')
      this.store.modal = null
    },
  },
}
</script>

<style lang="scss">
.defeat-container {
  width: 80%;
  text-align: center;

  &-text {
    text-align: left;
    padding: 72px 32px 8px 32px;
  }

  &-title {
    position: absolute;
    top: -16px;
    left: -16px;
    transform: rotate(-3deg);
    max-width: 380px;
  }

  &-button {
    margin-bottom: 32px;
  }

  img {
    height: 100px;
  }

  &.budget {
    img {
      margin-top: 8px;
    }
  }
}
</style>
