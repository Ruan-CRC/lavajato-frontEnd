<template>
  <div class="container">
    <v-parallax
      src="../../assets/images/paralaxtst.png"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h4 font-weight-thin mb-4">
          Ola Mundo!
        </h1>
        <h2 class="subheading">
          Esse é o agendamento de serviços
        </h2>
      </div>
    </v-parallax>
  </div>
  <div>
    <calendar />
  </div>
</template>
<script>
import calendar from '../calendar/index.vue'
  
export default {
  name: 'home',
  components: {
    calendar
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
