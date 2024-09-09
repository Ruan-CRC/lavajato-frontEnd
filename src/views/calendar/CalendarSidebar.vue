<template>
  <div class="calendar-sidebar">
      <section class="instructions">
          <h2>Serviços</h2>
          <v-sheet class="mx-auto">
            <v-form ref="formRef" fast-fail validate-on="submit" @submit.prevent="submitServicos">
              <v-select
                v-model="form.veiculos"
                label="Veículo"
                :rules="fromRules.veiculos"
                variant="solo"
                :items="veiculosItens"
                :item-title="item => item.nome + ' - ' + item.placa"
                item-value="id"
                return-object
              ></v-select>

              <v-select
                v-model="form.servicos"
                label="Serviço"
                :rules="fromRules.servicos"
                variant="solo"
                :items="servicosItens"
                item-title="nome"
                item-value="id"
                return-object
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
import { useUserStore } from '@/stores/UserStore'

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
      veiculosStor: null,
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
            if (value.id) return true

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
    this.getServicosAPI()
    this.getVeiculos()
  },
  computed: {
    ...mapStores(useCalendarStore, useUserStore),
    dataAgenda() {
      if (this.calendarStore.dataEvent.length > 0) {
        this.form.dataInicio = this.calendarStore.dataEvent
        return this.calendarStore.dataEvent
      }
      const data = new Date(this.calendarStore.dataEvent);
      this.form.dataInicio = data.toLocaleDateString('pt-BR', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
      });
      return this.calendarStore.dataEvent
    }
  },
  methods: {
    async submitServicos() {
      const formIsValid = await this.$refs.formRef.validate();
      if (formIsValid && !formIsValid.valid) return;

      const data = {
        veiculoId: this.form.veiculos.id,
        servicoIds: this.form.servicos.map(servico => servico.id),
        dataInicio: Date.parse(this.calendarStore.dataEvent),
        socket: this.calendarStore.socketId,
      }

      api.post('/api/v1/agenda/create', data).catch(error => {
        this.calendarStore.addError(error.data);
      })
    },
    async getVeiculos() {
      const veiculosUsuario = JSON.parse(localStorage.getItem('user&veiculo')).user.veiculos

      let veiculosAPI
      await api.get('/api/v1/veiculo/all')
        .then(response => {
          veiculosAPI = response.data.data
        })
        .catch(error => {
          console.log('error', error)
        })

        this.mesclaIdVeiculoComPlaca(veiculosUsuario, veiculosAPI).forEach(veiculo => {
          this.veiculosItens.push(veiculo)
        })
    },
    getServicosAPI() {
      api.get('api/v1/servico/all')
        .then(response => {
          response.data.servicos.forEach(servico => {
            this.servicosItens.push(servico)
          })
        })
        .catch(error => {
          console.log('error', error)
        })
    
    },
    mesclaIdVeiculoComPlaca(placas, tipos) {
      const output = []
      placas.map(veiculo => {
        const tipo = tipos.find(t => t.id === veiculo.tipo);
        output.push( {
          id: veiculo.id,
          nome: tipo ? tipo.nome : null,
          placa: veiculo.placa
        });
      });
      return output;
    },
  }
}
</script>

<style scoped>
    .calendar-sidebar {
        width: 30%;
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
@media screen and (max-width: 640px) {
  .calendar-sidebar {
        width: 100%;
        line-height: 1.5;
        background: #eaf9ff;
        border-right: 1px solid #d3e2e8;
    }
  
}
</style>
