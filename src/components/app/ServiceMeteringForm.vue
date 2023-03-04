<template>
  <div>
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
      :disabled="disableCapacityInput"
    />

    <v-autocomplete
      v-if="form.metraje === 'Baja'"
      v-model="serviceType"
      label="Tipo de servicio (Segun transformación)"
      :items="serviceTypes"
      hide-no-data
      hide-details
    />

    <div v-if="form.metraje === 'Baja'">
      <p class="pl-0">
        {{ $t("services.fields.transformers_amount") }}
      </p>

      <v-btn-toggle group class="test">
        <v-btn @click="transformerAmountMinusOne">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn @click="transformerAmountPlusOne">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div v-else>
      <transformer-form
        v-for="(transformer, i) in transformers"
        :key="i"
        :mono-phase="transformerCapacitiesMonoPhase.capacities"
        :three-phase="transformerCapacitiesThreePhase.capacities"
        v-model:type="transformer.type"
        v-model:capacity="transformer.capacity"
        @on-close-transformer="deleteTransformer(i)"
      />
    </div>
  </div>
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
        let capacidad = 0;
        if (this.transformers.length) {
          for (const { capacity } of this.transformers) {
            if (capacity !== "" && capacity) {
              capacidad += capacity;
            }
          }
          return capacidad;
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
    disableCapacityInput() {
      if (this.form.metraje === "Alta") {
        return false;
      } else {
        return true;
      }
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
    transformerAmountMinusOne() {
      if (this.transformers.length > 0) {
        this.transformers.pop();
      }
    },
    transformerAmountPlusOne() {
      if (this.transformers.length < 3) {
        this.transformers.push({ type: "mono_phase", capacity: "" });
      }
    },
    deleteTransformer(i) {
      this.transformers.splice(i, 1);
    },
  },
};
</script>

<style></style>