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
import axios from "axios";
import { mapActions } from "pinia";
import { api } from "~/config";

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

    createService(form) {
      this.loading = true;
      axios
        .post(api.path("user"), form)
        .then((res) => {
          this.addNotification(
            this.$t("notifications.succesfull_insert"),
            "success"
          );
          this.$refs.table.addRow(form);
          this.formDialog = false;
          this.loading = false;
        })
        .catch((err) => {
          this.addNotification(
            this.$t("notifications.unsuccesfull_insert"),
            "error"
          );
          console.log(err);
          this.loading = false;
        });
    },
  },
};
</script>
