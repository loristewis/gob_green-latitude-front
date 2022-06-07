<template>
  <div class="defeat-container" :class="infos.type">
    <div class="defeat-container-backdrop" />
    <CardContainer class="defeat-container-card">
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
  </div>
</template>

<script>
import { useStore } from '@/store'
import { CardContainer, Sticker, Button } from '@/components/lib'

export default {
  name: 'DefeatContainer',
  components: { CardContainer, Sticker, Button },
  props: {
    infos: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    finishGame() {
      this.store.moveToStep('animation-end')
    },
  },
}
</script>

<style lang="scss">
.defeat-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  &-backdrop {
    background-color: var(--color-beige-dark);
    position: absolute;
    inset: 0;
    opacity: 0.4;
    --opacity: 0.4;
    animation: fadein 0.4s;
  }

  &-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
    animation: modal-appear 0.4s;
    // animation: appear 1s ease-in-out;
  }

  &-text {
    text-align: left;
    padding: 72px 32px 8px 32px;
  }

  &-title {
    position: absolute;
    top: -16px;
    left: -16px;
    transform: rotate(-3deg);
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
