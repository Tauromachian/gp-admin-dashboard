<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row wrap>
      <v-col md="12">
        <v-card elevation="0">
          <app-plan-one-year-table class="pt-0 pb-0" />
          <v-btn
            absolute
            dark
            fab
            top
            right
            color="primary"
            class="mt-6"
            large
            @click="formDialog = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-dialog v-model="formDialog" width="900">
            <app-plan-one-year-form class-computed="ml-10 mr-10" @plan-submit="createPlan">
              <template #form-actions="{ createPlan }">
                <app-form-actions
                  :loading-buttons="loading"
                  :enable-cancel="true"
                  @on-submit="createPlan"
                  @on-cancel="closeUpdateDialog"
                />
              </template>
            </app-plan-one-year-form>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Plan',
  middleware: 'auth',

  data () {
    return {
      defaultColDef: null,
      formDialog: false,
      loading: false
    }
  },

  methods: {
    createPlan () {

    },

    closeUpdateDialog () {
      this.formDialog = false
    }
  }
}
</script>
