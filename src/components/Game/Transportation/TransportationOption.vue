<template>
  <div class="transport-card-option" @click="$emit('select-option')">
    <div>
      <Tag v-if="option.attributes.tagline" color="green" class="option-tag">
        {{ option.attributes.tagline }}
      </Tag>

      <div class="option-name">
        <div class="option-radio-container">
          <div class="option-radio" :class="{ selected: selected }" />
        </div>

        <Title tag="h3">{{ option.attributes.title }}</Title>
      </div>

      <div class="option-description">
        <div v-if="option.attributes.perks.length">
          <ChecklistElement v-for="item in option.attributes.perks">
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
import { Title, Tag, ChecklistElement } from './../../lib'

export default {
  name: 'TransportationOption',
  components: { Title, Tag, ChecklistElement },
  props: {
    option: {
      type: Object,
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
.transport-card-option {
  + .transport-card-option {
    margin-top: 24px;
  }

  .option-tag {
    margin-bottom: 8px;
  }

  .option-name {
    display: flex;
    align-items: center;
    column-gap: 4px;

    .title-container {
      padding-bottom: 0;
    }

    .option-radio-container,
    .title-container {
      height: 24px;
    }

    .option-radio {
      height: 16px;
      width: 16px;
      padding: 2px;
      border-radius: 100%;
      border: 2px solid var(--color-blue-gray);
      background-clip: content-box;

      &.selected {
        background-color: var(--color-blue-gray);
      }
    }
  }

  .option-description {
    padding-left: 20px;
  }
}
</style>
