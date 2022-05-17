<template>
  <CardContainer
    :class="isSelected(transport) ? 'selected' : ''"
    class="transport-card-container"
  >
    <div>
      <div class="transport-card-button">
        <img class="image" :src="image" alt="" />

        <div class="details">
          <Title tag="h2">
            {{ store.wording(transport.title) }}
          </Title>

          <Tag v-if="sticker" tag="h2" :color="tagColor">
            {{ sticker }}
          </Tag>

          <p>
            {{ transport.description }}
          </p>
        </div>

        <div class="punch" />
      </div>

      <div v-if="isSelected(transport)" class="transport-card-body">
        <TransportationOption
          @select-option="selectOption(i)"
          v-for="(option, i) in sortOptions(transport.options.data)"
          :option="option"
          :budget="transport.budget + option.attributes.budget"
          :selected="this.selectedOptionIndex === i"
          :key="i"
        />

        <Button @click="validateOption" class="reservation-button">
          On réserve !
        </Button>
      </div>
    </div>
  </CardContainer>
</template>

<script>
import { useStore } from './../../../store/index'

import TransportationOption from './TransportationOption.vue'
import CardContainer from './../../lib/cards/sub-components/CardContainer.vue'
import Title from './../../lib/Title.vue'
import Tag from './../../lib/Tag.vue'
import Button from './../../lib/Button.vue'

export default {
  name: 'TransportationCard',
  components: {
    TransportationOption,
    CardContainer,
    Title,
    Tag,
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
    image: {
      type: String,
      default: 'https://picsum.photos/200/200',
    },
    sticker: {
      type: String,
    },
  },
  data() {
    return {
      selectedOptionIndex: 0,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
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
      const sorted = array.sort((a, b) => {
        return a.attributes.budget - b.attributes.budget
      })
      return sorted
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
      transportation.pollution += selectedOption.budget
      this.store.selected = transportation

      this.$emit('validate-transportation')
    },
  },
}
</script>

<style lang="scss">
.transport-card-container {
  margin: 0 24px 16px;

  .transport-card-button {
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    .image {
      width: 136px;
      border-radius: 24px 0 0 24px;
    }

    > .details {
      padding: 16px;
    }

    > .punch {
      position: absolute;
      right: 0;
      height: 64px;
      width: 8px;
      border-radius: 16px 0 0 16px;
      background-color: var(--color-beige-cool);
    }
  }

  &.selected {
    .transport-card-button {
      cursor: default;

      .image {
        border-radius: 24px 0 0 0;
      }
    }
  }

  .transport-card-body {
    border-top: 2px dashed var(--color-beige-light);
    padding: 24px 16px 112px;
    overflow: visible;

    .reservation-button {
      position: absolute;
      bottom: 8px;
      right: -16px;
    }
  }
}
</style>
