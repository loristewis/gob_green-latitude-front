<template>
  <div class="prescription-reminder-container">
    <div class="prescription-reminder">
      <div>
        <img :src="environment" />
      </div>
      <div>
        <img :src="wish" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'

import { gameIcons } from '@/constants'

export default {
  name: 'PrescriptionReminder',
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      environment: gameIcons['mer'],
      wish: gameIcons[this.store.trip.wish],
    }
  },
}
</script>

<style lang="scss">
.prescription-reminder-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.prescription-reminder {
  position: fixed;
  margin-top: -78px;
  margin-left: 24px;
  display: flex;

  > div {
    background-color: var(--color-beige-cool);
    height: 54px;
    width: 54px;
    border-radius: 54px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 46px;
      width: 46px;
      position: relative;
    }

    + div {
      margin-left: -12px;
    }
  }
}
</style>
