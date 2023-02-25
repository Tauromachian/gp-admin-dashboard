<template>
  <v-card class="height">
    <v-card-title>{{ service.name }},</v-card-title>
    <v-card-subtitle>
      <div>
        {{ service.codcli }}
      </div>
    </v-card-subtitle>
    <v-card-actions class="actions-styles">
      <v-spacer />
      <v-btn color="primary" text @click="manageClicked">
        {{ $t("services.manage") }}
      </v-btn>
      <v-btn icon color="primary" @click="seeClicked">
        <v-icon>
          mdi-eye
        </v-icon>
      </v-btn>
      <v-btn icon color="primary" @click="editClicked">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon color="primary" @click="dialog = true">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
    <material-delete-dialog-complex
      v-model="dialog"
      :confirmation-text="service.name"
      @accept-click="deleteClicked"
    />
  </v-card>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      dialog: false
    }
  },
  methods: {
    manageClicked () {
      this.$emit('click:manage')
    },
    seeClicked () {
      this.$emit('click:see')
    },
    editClicked () {
      this.$emit('click:edit')
    },
    deleteClicked () {
      this.$emit('click:delete')
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.height {
    height: 220px;
}
.actions-styles{
    position: absolute !important;
    bottom: 0;
    right: 0;
}
</style>
