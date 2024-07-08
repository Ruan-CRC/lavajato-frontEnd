<template>
  <div id="app">
    <div class="container">
      <h3>Login</h3>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Nome"
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>

        <v-btn
          class="me-4"
          type="submit"
        >
          enviar
        </v-btn>

        <v-btn @click="handleReset">
          limpar
        </v-btn>
      </form>
    </div>
  </div>
</template>
<script setup>
  import { useField, useForm } from 'vee-validate'
  import { useRouter } from 'vue-router'

const router = useRouter()

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 2) return true

        return 'Nome precisa no mínimo de 2 caracteres.'
      },
      email (value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Precisa ser um email válido.'
      },
    },
  })
  const name = useField('name')
  const email = useField('email')

  // eslint-disable-next-line no-unused-vars
  const submit = handleSubmit(values => {
    router.push({ name: 'calendar' })
  })
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
