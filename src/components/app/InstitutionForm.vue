<template>
  <material-form :title="$t('institutions.form_name')">
    <v-form ref="form">
      <v-container py-0>
        <v-row wrap>
          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-text-field
              v-model="form.name"
              :label="$t('institutions.fields.name')"
              :rules="genericRequiredRule(null, 'El nombre de la institucion es requerido')"
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-autocomplete
              v-model="form.province"
              :items="provinces"
              :label="$t('institutions.fields.province')"
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-text-field
              v-model="form.organism"
              :label="$t('institutions.fields.organism')"
              :rules="genericRequiredRule(null, 'El organismo es requerido')"
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-textarea
              v-model="form.description"
              :label="`${$t('institutions.fields.description')} (opcional)`"
              outlined
              auto-grow
            />
          </v-col>

          <slot />
        </v-row>
      </v-container>
    </v-form>
  </material-form>
</template>

<script>
import { isEmail, isPhone } from '~/helpers/regex'
import genericRequiredRule from '~/mixins/genericRequiredRule'

export default {
  name: 'InstitutionForm',
  mixins: [genericRequiredRule],
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      provinces: [
        'Pinar del Río',
        'Artemisa',
        'La Habana',
        'Mayabeque',
        'Matanzas',
        'Cienfuegos',
        'Villa Clara',
        'Sancti Spíritus',
        'Ciego de Ávila',
        'Camagüey',
        'Las Tunas',
        'Granma',
        'Holguín',
        'Santiago de Cuba',
        'Guantánamo',
        'Isla de la Juventud'
      ],
      mailRules: [
        v => !!v || 'El nombre del servicio falta',
        v => isEmail(v) || 'Caracteres no permitidos'
      ],
      phoneRules: [
        v => !!v || 'La demanda contratada falta',
        v => isPhone(v) || 'La Demanda contratada es un numero'
      ]
    }
  },
  computed: {
    form: {
      get () {
        return this.value
      },
      set (form) {
        this.$emit('input', form)
      }
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
