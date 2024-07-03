<script>
import formLogin from '@/components/Forms/formLogin/index.vue'
import baseForms from '@/components/Forms/baseForms/index.vue'

export default {
  components: {
    formLogin,
    baseForms
  },
}
</script>

<template>
  <base-forms>
    <form-login></form-login>
    <h3>this will be a cadaster</h3>
  </base-forms>
</template>
<style lang="scss" scoped>
@import 'style.scss';
</style>
