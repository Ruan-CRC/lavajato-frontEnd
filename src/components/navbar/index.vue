<script>
import { isScreenWidthMobile } from '@/utils/tela'
import dropDown from './drop-down/index.vue'

// var windowSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

export default {
  components: {
    dropDown,
  },
  data () {
    return {
      mobile: true,
    }
  },
  created() {
    this.mobile = isScreenWidthMobile()
  },
  methods: {
    getSizeWindow() {
      //m
    }
  },

  
}
</script>
<template>

  <div class="wrapper">
    <img width="85px" src="../../assets/images/TopGearlogo..gif" alt="logo da nav bar">
    <div v-if="!mobile">
      <nav>
        <ul>
          <li><router-link to="/login">Cadastre-se</router-link></li>
          <li><router-link to="/login">Serviços</router-link></li>
          <li><router-link to="/about">Contatos</router-link></li>
        </ul>
      </nav>
    </div>
    <div class="mobileDropDown" v-if="mobile">
    <i class="fa-solid fa-bars">
      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="block"
      >
        <dropDown />
      </v-overlay>
    </i>
  </div>
  </div>
</template>
<style lang="scss" scoped>
@import 'style.scss';
</style>