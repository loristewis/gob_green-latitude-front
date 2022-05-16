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
      </RadioButton>

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
import { Title, Tag, ChecklistElement, RadioButton } from './../../lib'

export default {
  name: 'TransportationOption',
  components: { RadioButton, Title, Tag, ChecklistElement },
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
.transport-option-container {
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
}
</style>
