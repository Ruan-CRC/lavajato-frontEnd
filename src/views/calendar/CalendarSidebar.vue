<template>
  <div class="calendar-sidebar">
      <section class="instructions">
          <h2>Serviços</h2>
          <v-sheet class="mx-auto" width="230">
            <v-form ref="formRef" fast-fail validate-on="submit" @submit.prevent="submitServicos">
              <v-select
                v-model="form.veiculos"
                label="Veículo"
                :rules="fromRules.veiculos"
                variant="solo"
                :items="veiculosItens"
              ></v-select>

              <v-select
                v-model="form.servicos"
                label="Serviço"
                :rules="fromRules.servicos"
                variant="solo"
                :items="servicosItens"
                multiple
              ></v-select>

              <v-text-field
                hide-details="auto"
                :placeholder="dataAgenda"
                v-model="form.dataInicio"
                :rules="fromRules.dataInicio"
                variant="solo"
                prepend-inner-icon="mdi-calendar"
                readonly
              ></v-text-field>

              <v-checkbox
                v-model="form.isDiskBusca"
                label="Disk-Busca"
              ></v-checkbox>

              <span class="ml-3">valor: {{ allServiceValue }}</span>

              <v-btn class="mt-2" type="submit" block>Enviar</v-btn>
            </v-form>
          </v-sheet>
      </section>

      <section class="events-list">
          <h2>Já Agendados: ({{ events.length }})</h2>
      </section>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCalendarStore } from '@/stores/CalendarStore'

import api from '../../api/axiosConfig';

export default {
  props: {
    events: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      servicosItens: [],
      veiculosItens: [],
      allServiceValue: 0,
      form: {
        isDiskBusca: false,
        servicos: [],
        veiculos: [],
        dataInicio: '',
        value: ''
      },
      fromRules: {
        servicos: [
          value => {
            if (value.length > 0) return true

            return 'Selecione ao menos um serviço'
          }
        ],
        veiculos: [
          value => {
            if (value.length > 0) return true

            return 'Selecione ao menos um veículo'
          }
        ],
        dataInicio: [
          value => {
            if (value !== 'selecione a data') return true

            return 'Selecione uma data'
          }
        ]
      }
    }
  },
  created() {
    this.getVeiculosAPI()
    this.getServicosAPI()
  },
  computed: {
    ...mapStores(useCalendarStore),
    dataAgenda() {
      this.form.dataInicio = this.calendarStore.dataEvent
      return this.calendarStore.dataEvent
    }
  },
  methods: {
    async submitServicos() {
      const formIsValid = await this.$refs.formRef.validate();
      if (formIsValid && !formIsValid.valid) return;
      
      console.log('submitServicos', this.form)
    },
    getVeiculosAPI() {
      api.get('/api/v1/veiculos/all')
        .then(response => {
          console.log('response', response.data)
          let veiculosMap = new Map()
          response.data.data.forEach(veiculo => {
            veiculosMap.set(veiculo.tipo)
          })

          this.veiculosItens = veiculosMap
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    getServicosAPI() {
      api.get('api/v1/servicos/all')
        .then(response => {
          let servicosMap = new Map()
          response.data.data.forEach(servico => {
            servicosMap.set(servico.nome)
          })

          this.servicosItens = servicosMap
        })
        .catch(error => {
          console.log('error', error)
        })
    
    }
  }
}
</script>

<style scoped>
    .calendar-sidebar {
        width: 300px;
        line-height: 1.5;
        background: #eaf9ff;
        border-right: 1px solid #d3e2e8;
    }

    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }

    ul li {
        margin: 1.5em 0;
        padding: 0;
    }

    section {
        padding: 2em;
    }

    h2 {
        margin: 0;
        font-size: 16px;
    }
</style>
