<template>
  <CardContainer class="transport-card-container">
    <Disclosure>
      <DisclosureButton as="div" class="transport-card-button">
        <img class="image" :src="image" alt="" />

        <div class="details">
          <Title tag="h2">
            {{ title }}
          </Title>

          <p>
            {{ description }}
          </p>
        </div>

        <div class="punch" />
      </DisclosureButton>

      <transition>
        <DisclosurePanel class="transport-card-body">
          Yes! You can purchase a license that you can share with your entire
          team.

          <Button class="reservation-button">On réserve !</Button>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </CardContainer>
</template>

<script>
import CardContainer from './sub-components/CardContainer.vue'
import Title from '../Title.vue'
import Button from '../Button.vue'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

export default {
  name: 'TransportCard',
  components: {
    CardContainer,
    Title,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Button,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    tagColor: {
      type: String,
      required: true,
      validator(value) {
        return ['red', 'blue'].includes(value)
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://picsum.photos/200/200',
    },
    sticker: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
.transport-card-container {
  .transport-card-button {
    display: flex;
    align-items: center;
    overflow: hidden;

    .image {
      width: 136px;
      border-radius: 24px 0 0 24px;
    }

    &[aria-expanded='true'] {
      .image {
        border-radius: 24px 0 0 0;
      }
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
      background-color: var(--color-beige-light);
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
