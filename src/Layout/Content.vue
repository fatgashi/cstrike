<template>
  <div class="bg-dark" style="min-height: 80vh; position: relative; z-index: 1;">
    <VSnow :density="snowOptions.density"
    :size="snowOptions.size"
    :fall_speed="snowOptions.fall_speed"
    :color="snowOptions.color"
    :opacity="snowOptions.opacity"
  />
    <router-view></router-view>
  </div>
</template>
  
<script>
  import {VSnowDirective, VSnowContainer} from 'vsnow'

  export default {
    components: {
      VSnow: VSnowContainer
    },
    directives:{
      'snow' : VSnowDirective,
    },
    data(){
      return {
        snowOptions: {
          density: 50,
          fall_speed: 4,
          size: 10,
          color: "#FFFFFF",
          opacity: 1,
        }
      }
    }
  }
</script>
  
  <style>
  
  </style>