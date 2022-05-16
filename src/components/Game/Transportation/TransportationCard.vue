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

          <Tag tag="h2">
            {{ sticker }}
          </Tag>

          <p>
            {{ transport.description }}
          </p>
        </div>

        <div class="punch" />
      </div>

      <transition>
        <div v-if="isSelected(transport)" class="transport-card-body">
          <div
            @click="selectOption(i)"
            class="transport-card-option"
            v-for="(option, i) in sortOptions(transport.options.data)"
            :key="i"
          >
            <p v-if="this.selectedOptionIndex === i">sélectionné!</p>
            <Tag>{{ option.attributes.tagline }}</Tag>
            <p>{{ option.attributes.title }}</p>
            <p>{{ option.attributes.description }}</p>
          </div>
          <Button @click="validateOption" class="reservation-button"
            >On réserve !</Button
          >
        </div>
      </transition>
    </div>
  </CardContainer>
</template>

<script>
import { useStore } from './../../../store/index'

import CardContainer from './../../lib/cards/sub-components/CardContainer.vue'
import Title from './../../lib/Title.vue'
import Tag from './../../lib/Tag.vue'
import Button from './../../lib/Button.vue'

export default {
  name: 'TransportationCard',
  components: {
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
        return ['red', 'blue'].includes(value)
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
      selectedOptionIndex: 1,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
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
  margin: 0 24px;

  + .transport-card-container {
    margin-top: 16px;
  }

  .transport-card-button {
    display: flex;
    align-items: center;
    overflow: hidden;

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
    .transport-card-button .image {
      border-radius: 24px 0 0 0;
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
