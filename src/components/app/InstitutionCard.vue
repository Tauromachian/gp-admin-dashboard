<template>
  <v-card class="height">
    <v-card-title class="word-break-normal">
      {{ institution.name }}
    </v-card-title>
    <v-card-subtitle>
      <div>{{ institution.province }},</div>
      <div>
        {{ institution.organism }}
      </div>
    </v-card-subtitle>
    <v-card-actions class="actions-styles">
      <v-spacer />
      <v-btn icon color="primary" @click="seeClicked">
        <v-icon> mdi-eye </v-icon>
      </v-btn>
      <v-btn icon color="primary" @click="editClicked">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
      <v-btn icon color="primary" @click="dialog = true">
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </v-card-actions>
    <gen-delete-dialog-complex
      v-model="dialog"
      :confirmation-text="institution.name"
      @accept-click="deleteClicked"
    />
  </v-card>
</template>

<script>
export default {
  name: "InstitutionCard",
  props: {
    institution: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    seeClicked() {
      this.$emit("see-click");
    },
    editClicked() {
      this.$emit("edit-click");
    },
    deleteClicked() {
      this.$emit("delete-click");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.height {
  height: 220px;
}
.actions-styles {
  position: absolute !important;
  bottom: 0;
  right: 0;
}
</style>
