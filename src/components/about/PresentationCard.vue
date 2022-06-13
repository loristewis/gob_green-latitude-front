<template>
  <CardContainer class="presentation-card">
    <div class="presentation-card-main">
      <div class="presentation-card-portrait">
        <img :src="member.portrait" alt="" />
      </div>

      <div class="presentation-card-infos">
        <div>
          <p>Nom</p>

          <p>{{ member.lastname }}</p>
        </div>

        <div>
          <p>Prénom</p>

          <p>{{ member.firstname }}</p>
        </div>

        <div>
          <p>Rôle</p>

          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>

    <div class="presentation-card-tags">
      <span v-for="(tag, i) in member.tags" :key="i">#{{ tag }}</span>
    </div>

    <div class="presentation-card-stamp">
      <img :src="member.stamp" alt="" />
    </div>
  </CardContainer>
</template>

<script>
import { CardContainer } from '@/components/lib'

export default {
  name: 'PresentationCard',
  components: {
    CardContainer,
  },
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.presentation-card {
  position: relative;
  margin: 0 20px;
  padding: 16px;

  + .presentation-card {
    margin-top: 16px;
  }

  &-main {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }

  &-portrait {
    font-size: 0;
    img {
      border-radius: 6px;
      width: 100%;
    }
  }

  &-infos {
    > div p:first-child {
      font-size: 10px;
      line-height: 12px;
      opacity: 0.66;
    }

    > div + div {
      padding-top: 6px;
    }
  }

  &-tags {
    > span {
      font-size: 10px;
      padding-left: 8px;
      color: var(--color-hashtag);
    }
  }

  &-stamp {
    position: absolute;
    top: 16px;
    right: 16px;
    transform: rotate(40deg);
  }
}
</style>
