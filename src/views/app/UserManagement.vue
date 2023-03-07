<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify-center wrap>
      <v-col>
        <v-card elevation="0">
          <app-user-table class="pt-0 pb-0" />
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
            <app-user-form
              class-computed="ml-10 mr-10"
              @user-submit="createService"
            >
              <template #form-actions="{ serviceSubmit }">
                <app-form-actions
                  :loading-buttons="loading"
                  :enable-cancel="true"
                  @on-submit="serviceSubmit"
                  @on-cancel="closeUpdateDialog"
                />
              </template>
            </app-user-form>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";

export default {
  name: "UserManagement",
  data() {
    return {
      loading: false,
      formDialog: false,
    };
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
  },
};
</script>
