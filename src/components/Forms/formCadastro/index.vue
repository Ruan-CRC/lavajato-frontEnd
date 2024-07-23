<template>
  <div>
    <h3>Cadastro</h3>
    <v-sheet class="mx-auto" width="630">
      <v-form ref="formRef" fast-fail validate-on="submit" @submit.prevent="submitServicos">
        <v-text-field
          hide-details="auto"
          placeholder="Email"
          v-model="form.email"
          :rules="fromRules.email"
          variant="solo"
          prepend-inner-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          hide-details="auto"
          placeholder="Password"
          v-model="form.password"
          :rules="fromRules.password"
          variant="solo"
          prepend-inner-icon="mdi-key"
          type="password"
        ></v-text-field>

        <div class="veicolo-container">
          <v-select
            v-model="form.veiculos[0].tipo"
            label="Veiculo"
            :rules="fromRules.veiculos"
            variant="solo"
            :items="veiculosItens"
            item-title="nome"
            item-value="id"
            return-object
            prepend-inner-icon="mdi-car"
          ></v-select>

          <v-text-field
            hide-details="auto"
            label="Placa"
            v-model="form.veiculos[0].placa"
            :rules="fromRules.placa"
            variant="solo"
            prepend-inner-icon="mdi-car"
          ></v-text-field>
        </div>

        <v-btn class="mt-2" type="submit" block>Enviar</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/UserStore'

import api from '../../../api/axiosConfig';

export default {
  props: {
    events: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      veiculosItens: [],
      allServiceValue: 0,
      form: {
        email: '',
        password: '',
        veiculos: [{
          placa: '',
          tipo: '',
        }],
      },
      fromRules: {
        email: [
          value => {
            if (value.length > 0) return true
            return 'Campo obrigatório'
          }
        ],
        password: [
          value => {
            if (value.length > 0) return true
            return 'Campo obrigatório'
          }
        ],
        veiculos: [
          value => {
            if (value.tipo !== 0) return true
            return 'Campo obrigatório'
          }
        ],
      }
    }
  },
  created() {
    this.getVeiculosAPI()
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async submitServicos() {
      const formIsValid = await this.$refs.formRef.validate();
      if (formIsValid && !formIsValid.valid) return;

      const data = {
        email: this.form.email,
        password: this.form.password,
        veiculos: [{
          placa: this.form.veiculos[0].placa,
          tipo: this.form.veiculos[0].tipo.id,
        }],
      }
      
      api.post('api/v1/user/', data)
        .then(response => {
          localStorage.setItem('user&veiculo', JSON.stringify(response.data))

          this.$router.push('/calendar')
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    getVeiculosAPI() {
      api.get('/api/v1/veiculo/all')
        .then(response => {
          response.data.data.forEach(veiculo => {
            this.veiculosItens.push(veiculo)
          })
        })
        .catch(error => {
          console.log('error', error)
        })
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
