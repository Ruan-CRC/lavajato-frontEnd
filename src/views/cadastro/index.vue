<script>
import formCadastro from '@/components/Forms/formCadastro/index.vue'
import baseForms from '@/components/Forms/baseForms/index.vue'

export default {
  components: {
    formCadastro,
    baseForms
  },
}
</script>

<template>
  <base-forms>
    <form-cadastro></form-cadastro>
  </base-forms>
</template>
<style lang="scss" scoped>
@import 'style.scss';
</style>
