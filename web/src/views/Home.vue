<template>
  <div class="home">
    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
    </swiper-slide>
    <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data: () => ({
    swiperOption: {
      pagination: {
        el: '.pagination-home'
      }
    },
  })
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white")!important;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info")!important;
    }
  }
}
</style>

