<template>
  <CardContainer
    :class="{ selected: isSelected(transport) }"
    class="transport-card-container"
  >
    <div>
      <Sticker
        :theme="stickerTheme"
        class="transport-card-sticker"
        v-if="sticker"
      >
        {{ sticker }}
      </Sticker>

      <div class="transport-card-head">
        <div
          class="image-container"
          :style="{ backgroundColor: transportColor }"
        >
          <img class="image" :src="getImage(transport)" alt="" />
        </div>

        <div class="details">
          <Title tag="h2">
            {{ processedTitle }}
          </Title>

          <p>
            {{ processedDescription }}
          </p>
        </div>

        <div class="punch" />
      </div>

      <!--      <Transition name="slide-up">-->
      <div v-if="isSelected(transport)" class="transport-card-body">
        <TransportationOption
          @select-option="selectOption(i)"
          v-for="(option, i) in sortOptions(transport.options.data)"
          :option="option"
          :budget="transport.budget + option.attributes.budget"
          :selected="this.selectedOptionIndex === i"
          :key="i"
        />

        <Button
          :isDisabled="this.buttonDisabled"
          @click="validateOption"
          class="reservation-button"
        >
          On réserve !
        </Button>
      </div>
      <!--      </Transition>-->
    </div>
  </CardContainer>
</template>

<script>
import { Button, CardContainer, Sticker, Title } from '@/components/lib'
import { colorCombos } from '@/constants'
import { getImage, shuffleArray } from '@/helpers'
import { useStore } from '@/store'

import TransportationOption from './TransportationOption.vue'

export default {
  name: 'TransportationCard',
  components: {
    TransportationOption,
    CardContainer,
    Title,
    Sticker,
    Button,
  },
  props: {
    transport: {
      type: Object,
      required: true,
      default: () => {
        return {
          title: 'Brian Air',
          description: 'Description',
        }
      },
    },
    tagColor: {
      type: String,
      required: true,
      validator(value) {
        return ['red', 'green', 'purple', 'blue'].includes(value)
      },
    },
    sticker: {
      type: String,
    },
  },
  data() {
    return {
      selectedOptionIndex: 0,
      buttonDisabled: false,
      processedTitle: this.wording(this.transport.title),
      processedDescription: this.wording(this.transport.description),
      getImage,
    }
  },
  computed: {
    transportColor() {
      return `var(--color-${this.transport.color})`
    },
    stickerTheme() {
      const combos = shuffleArray([...colorCombos])
      const selectedCombo = combos.find(
        (el) => el.background !== this.transport.color
      )
      return selectedCombo.id
    },
  },
  setup() {
    const store = useStore()
    const wording = store.wording

    return {
      store,
      wording,
    }
  },
  mounted() {
    this.selectedOptionIndex = this.transport.options.data.length - 1
  },
  methods: {
    isSelected(transport) {
      if (this.store.selected) {
        return transport.title === this.store.selected.title
      } else {
        return false
      }
    },
    sortOptions(array) {
      return array.sort((a, b) => {
        return a.attributes.budget - b.attributes.budget
      })
    },
    selectOption(index) {
      this.selectedOptionIndex = index
    },
    validateOption() {
      const sortedOptions = this.sortOptions(this.transport.options.data)
      const selectedOption = sortedOptions[this.selectedOptionIndex].attributes

      let transportation = { ...this.store.selected }
      transportation.budget += selectedOption.budget
      transportation.wellness += selectedOption.wellness
      transportation.pollution += selectedOption.pollution
      this.store.selected = transportation
      this.store.thought = this.store.selected.thoughts
        ? this.store.selected.thoughts
        : this.store.thought

      this.buttonDisabled = true
      this.$emit('validate-transportation')
    },
  },
}
</script>

<style lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.transport-card-container {
  margin: 0 24px 16px;

  .transport-card-head {
    display: grid;
    grid-template-columns: minmax(132px, 1fr) 2fr;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    min-height: 140px;
    z-index: 1;

    .image-container,
    .details {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--color-white);
      transition: border-radius 0.2s;
    }

    .image-container {
      justify-content: flex-end;
      padding: 0 12px;
      border-radius: 24px 0 0 24px;

      .image {
        width: 100%;
      }
    }

    .details {
      justify-content: center;
      padding: 16px;
      border-radius: 0 24px 24px 0;
    }

    .punch {
      position: absolute;
      right: 0;
      height: 64px;
      width: 8px;
      border-radius: 16px 0 0 16px;
      background-color: var(--color-beige-cool);
    }
  }

  .transport-card-sticker {
    position: absolute;
    top: 16px;
    left: -12px;
    max-width: 140px;
    z-index: 2;
    transform: rotate(-6deg);
  }

  &.selected {
    .transport-card-head {
      .image-container {
        border-radius: 24px 0 0 0;
      }
    }
  }

  .transport-card-body {
    border-top: 2px dashed var(--color-beige-light);
    padding: 24px 16px 112px;
    overflow: visible;
    z-index: 0;

    .reservation-button {
      position: absolute;
      bottom: 8px;
      right: -16px;
    }
  }
}
</style>
