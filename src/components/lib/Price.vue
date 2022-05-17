<template>
  <div class="price-indicator">
    <div class="coin" v-for="index in value" :key="index">
      <img :src="Coin" />
    </div>
  </div>
</template>

<script>
import Coin from './../../assets/coin.svg'

export default {
  name: 'Price',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      Coin,
    }
  },
}
</script>

<style lang="scss">
.price-indicator {
  display: flex;

  .coin {
    transform: rotate(12deg);
    height: 26px;
    width: 26px;
    margin-top: -8px;

    & + .coin {
      margin-left: -12px;
    }
  }
}
</style>
