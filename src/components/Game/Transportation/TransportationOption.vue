<template>
  <div
    class="transport-option-container"
    :class="{ selected: selected }"
    @click="$emit('select-option')"
  >
    <div>
      <Tag v-if="option.attributes.tagline" color="green" class="option-tag">
        {{ option.attributes.tagline }}
      </Tag>

      <RadioButton class="option-name" :selected="selected">
        <Title tag="h3">{{ option.attributes.title }}</Title>
        <Price :value="budget" />
      </RadioButton>

      <div class="option-description">
        <div v-if="option.attributes.perks.length">
          <ChecklistElement
            v-for="(item, i) in option.attributes.perks"
            :key="i"
          >
            {{ item.content }}
          </ChecklistElement>
        </div>

        <p v-if="option.attributes.description">
          {{ option.attributes.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Title,
  Tag,
  ChecklistElement,
  Price,
  RadioButton,
} from '@/components/lib'

export default {
  name: 'TransportationOption',
  components: { Title, Tag, ChecklistElement, Price, RadioButton },
  props: {
    option: {
      type: Object,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.transport-option-container {
  cursor: pointer;

  &.selected {
    cursor: default;
  }

  + .transport-option-container {
    margin-top: 24px;
  }

  .option-tag {
    margin-bottom: 8px;
  }

  .option-name {
    .title-container {
      padding-bottom: 0;
    }
  }

  .option-description {
    padding-left: 20px;
  }

  .title-container + .price-indicator {
    margin-left: 8px;
  }
}
</style>
