<template>
  <div class="modal-container">
    <div @click="closeModal" class="backdrop" />

    <component
      @close-modal="closeModal"
      class="modal-card-container"
      :is="modals[store.modal]"
    ></component>
  </div>
</template>

<script>
import { modals } from '@/constants'
import { useStore } from '@/store'

export default {
  name: 'ModalContainer',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
  data() {
    return {
      modals,
    }
  },
  methods: {
    closeModal() {
      if (this.store.modal === 'defeat') return
      console.log('close modal')
      this.store.modal = null
    },
  },
}
</script>

<style lang="scss">
.modal-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  z-index: 10;

  &.hidden {
    display: none;
  }

  .backdrop {
    background-color: var(--color-beige-dark);
    position: absolute;
    inset: 0;
    opacity: 0.4;
  }

  .modal-card-container {
    animation: appear 0.6s ease-in-out;
  }
}
</style>
