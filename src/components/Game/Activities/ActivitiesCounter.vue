<template>
  <div class="activities-counter-container">
    <Tag
      class="activities-counter-alert"
      :class="!displayAlert ? 'hidden' : ''"
      color="green"
      >{{ alert }}</Tag
    >

    <div class="counter-listing">
      <div
        v-for="index in 3"
        :key="index"
        class="counter"
        :class="index <= 3 - left ? 'checked' : ''"
      >
        <CheckIcon class="hero-icon" />
        <span class="count">{{ index }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Tag } from '@/components/lib'
import { CheckIcon } from '@heroicons/vue/solid'

export default {
  name: 'ActivitiesCounter',
  components: { Tag, CheckIcon },
  props: {
    left: {
      type: Number,
      required: true,
    },
    displayAlert: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    alert() {
      return this.left > 1
        ? `Choisis encore ${this.left} activités !`
        : "Plus qu'une activité !"
    },
  },
}
</script>

<style lang="scss">
.activities-counter-container {
  .counter-listing {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 8px 0 16px 0;
  }

  .activities-counter-alert {
    transition: opacity 0.2s;

    &.hidden {
      opacity: 0;
    }
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    font-weight: 600;
    background-color: var(--color-beige-dark);
    display: grid;

    .hero-icon {
      color: var(--color-white);
      height: 20px;
      width: 20px;
      opacity: 0;
      grid-area: 1 / -1;
    }

    .count {
      grid-area: 1 / -1;
      text-align: center;
    }

    &.checked {
      background-color: var(--color-green-light);

      .hero-icon {
        opacity: 1;
      }

      .count {
        opacity: 0;
      }
    }
  }
}
</style>
