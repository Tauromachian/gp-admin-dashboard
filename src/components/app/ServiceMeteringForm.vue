<template>
  <v-form ref="form">
    <gen-button-group
      v-model="form.metraje"
      :label="$t('services.fields.metraje')"
    >
      <v-btn class="ml-0" value="Alta"> Alta </v-btn>
      <v-btn value="Baja"> Baja </v-btn>
    </gen-button-group>

    <v-text-field
      v-model="capacityComputed"
      :label="$t('services.fields.capacity') + ' (kVA)'"
      :rules="[rules.required(), rules.number()]"
      :disabled="!isCapacityInputEnabled"
    />

    <template v-if="form.metraje === 'Baja'">
      <v-autocomplete
        class="mb-8"
        v-model="serviceType"
        label="Tipo de servicio (Segun transformación)"
        :items="serviceTypes"
        hide-no-data
        hide-details
      />

      <div class="d-flex align-center mb-2">
        <p class="pl-0">
          {{ $t("services.fields.transformers_amount") }}
        </p>

        <v-btn
          color="primary"
          class="ml-2"
          @click="transformerAmountPlusOne"
          icon="mdi-plus"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-card
        variant="outlined"
        v-for="(transformer, i) in transformers"
        class="mb-2"
        :key="i"
      >
        <v-card-text>
          <transformer-form
            :mono-phase="transformerCapacitiesMonoPhase.capacities"
            :three-phase="transformerCapacitiesThreePhase.capacities"
            v-model:type="transformer.type"
            v-model:capacity="transformer.capacity"
            @on-close-transformer="deleteTransformer(i)"
          />
        </v-card-text>
      </v-card>
    </template>
  </v-form>
</template>

<script>
import TransformerForm from "@/components/app/TransformerForm.vue";

import { required, number } from "@/utils/rules";

import { serviceTypes } from "@/utils/staticValues";

export default {
  name: "ServiceMeteringForm",
  components: {
    TransformerForm,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      transformers: [],

      serviceType: "Monofásico 110 V",
      serviceTypes,

      transformerCapacitiesMonoPhase: {
        type: "mono_phase",
        ids: [],
        capacities: [],
      },
      transformerCapacitiesThreePhase: {
        type: "three_phase",
        ids: [],
        capacities: [],
      },

      rules: { required, number },
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    capacityComputed: {
      get() {
        let totalCapacity = 0;
        if (this.transformers.length) {
          for (const { capacity } of this.transformers) {
            if (capacity !== "" && capacity) {
              totalCapacity += capacity;
            }
          }
          return totalCapacity;
        } else {
          return this.form.capacidad;
        }
      },
      set(val) {
        this.form.capacidad = val;
      },
    },
    metraje() {
      return this.form.metraje;
    },
    isCapacityInputEnabled() {
      return this.form.metraje === "Alta";
    },
  },
  watch: {
    metraje(val) {
      if (val === "Alta") {
        this.transformers = [];
      }
    },
  },
  methods: {
    transformerAmountPlusOne() {
      if (this.transformers.length < 3) {
        this.transformers.push({ type: "mono_phase", capacity: "" });
      }
    },
    deleteTransformer(i) {
      this.transformers.splice(i, 1);
    },

    handleStep() {
      return true;
    },

    async validate() {
      return await this.$refs.form.validate();
    },
  },
};
</script>

<style></style>
