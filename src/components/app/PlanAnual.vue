<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row wrap>
      <v-col>
        <v-card>
          <app-plan-institution-table />
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
            <app-plan-form
              class-computed="ml-10 mr-10"
              @plan-submit="createPlan"
            >
              <template #form-actions="{ planSubmit }">
                <app-form-actions
                  :loading-buttons="loading"
                  :enable-cancel="true"
                  @on-submit="planSubmit"
                  @on-cancel="closeBalanceDialog"
                />
              </template>
            </app-plan-form>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlanAnual',
  middleware: 'auth',

  data () {
    return {
      formDialog: false,
      loading: false
    }
  },
  methods: {
    createPlan(form) {
      console.log(form);
    },
    closeBalanceDialog() {
      this.formDialog = false
    }
  }
}
</script>
