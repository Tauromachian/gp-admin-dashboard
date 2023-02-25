<template>
  <v-row>
    <v-col xs="12" md="2">
      <material-button-group v-model="metrajeComputed" :label="$t('services.fields.metraje')">
        <v-btn class="ml-0" value="Alta">
          Alta
        </v-btn>
        <v-btn value="Baja">
          Baja
        </v-btn>
      </material-button-group>
    </v-col>
    <v-col xs="12" md="2">
      <v-text-field
        v-model="capacityComputed"
        :label="$t('services.fields.capacity') + ' (kVA)'"
        :rules="capacityRules"
        :disabled="disableCapacityInput"
      />
    </v-col>

    <v-col v-if="metrajeComputed === 'Baja'" xs="12" md="4">
      <v-subheader class="pl-0">
        {{ $t('services.fields.transformers_amount') }}
      </v-subheader>

      <v-btn-toggle group class="test">
        <v-btn @click="transformerAmountMinusOne">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn @click="transformerAmountPlusOne">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <v-col md="12" class="pt-0 pb-0" />

    <v-col v-for="(transformer, i) in transformers" :key="i" xs="12" md="4">
      <app-transformer-form
        :mono-phase="transformerCapacitiesMonoPhase.capacities"
        :three-phase="transformerCapacitiesThreePhase.capacities"
        :type.sync="transformer.type"
        :capacity.sync="transformer.capacity"
      />
    </v-col>
  </v-row>
</template>

<script>
import { isNumber, isNumberAndLettersWithWhiteSpaces } from '~/helpers/regex'
import axios from 'axios'

export default {
  name: 'ServiceFormFootage',
  props: {
    metraje: {
      type: String,
      required: true
    },
    capacity: {
      type: [Number, String],
      required: true
    },
    transformersIds: {
      type: [String],
      default: ''
    }
  },
  mounted: function() {
    this.fillTransformersData()
  },
  data: function () {
    return {
      transformers: [],
      capacityRules: [
        v => !!v || 'La capacidad falta',
        v => isNumber(v) || 'La capacidad es un numero'
      ],
      transformerCapacitiesMonoPhase: {
        type: 'mono_phase',
        ids: [],
        capacities: []
      },
      transformerCapacitiesThreePhase: {
        type: 'three_phase',
        ids: [],
        capacities: []
      },
    }
  },
  computed: {
    metrajeComputed: {
      get () {
        return this.metraje
      },
      set (value) {
        this.$emit('update:metraje', value)
      }
    },
    capacityComputed: {
      get () {
        let capacidad = 0
        if (this.transformers.length) {
          for (const { capacity } of this.transformers) {
            if (capacity !== '' && capacity) {
              capacidad += capacity
            }
          }
          return capacidad
        } else {
          return this.capacidad
        }
      },
      set (value) {
        this.$emit('update:capacity', value)
      }
    },
    transformersIdsComputed () {
      console.log('lol');
      
      const transformers_ids = this.getTransformersId(this.transformers)
      this.$emit('update:transformers-ids', transformers_ids)
    },
    disableCapacityInput () {
      if (this.metraje === 'Alta') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getTransformersId (transformers) {
      let tranformersIdsString = ''
      for (let i = 0; i < transformers.length; i++) {
        if (this.getTransformerId(transformers[i])) {
          tranformersIdsString += this.getTransformerId(transformers[i]) + ','
        }
      }
      return tranformersIdsString.slice(0, -1)
    },
    getTransformerId (transformer) {
      if (transformer.type === 'mono') {
        const index = this.transformerCapacitiesMonoPhase.capacities.indexOf(
          transformer.capacity
        )
        return this.transformerCapacitiesMonoPhase.ids[index]
      } else {
        const index = this.transformerCapacitiesThreePhase.capacities.indexOf(
          transformer.capacity
        )
        return this.transformerCapacitiesThreePhase.ids[index]
      }
    },
    transformerAmountMinusOne () {
      if (this.transformers.length > 0) {
        this.transformers.pop()
      }
    },
    transformerAmountPlusOne () {
      if (this.transformers.length < 3) {
        this.transformers.push({ type: 'mono_phase', capacity: '' })
      }
    },
    fillTransformersData () {
      axios
        .get('/api/v1/transformer')
        .then(res => {
          res.data.forEach(transformer => {
            if (transformer.type === 'mono') {
              this.transformerCapacitiesMonoPhase.ids.push(
                transformer.id
              )
              this.transformerCapacitiesMonoPhase.capacities.push(
                transformer.capacity
              )
            } else {
              this.transformerCapacitiesThreePhase.ids.push(
                transformer.id
              )
              this.transformerCapacitiesThreePhase.capacities.push(
                transformer.capacity
              )
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style scoped>
.v-subheader {
  height: inherit;
}
</style>
