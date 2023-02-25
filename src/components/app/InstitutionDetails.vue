<template>
  <v-scroll-y-transition mode="out-in">
    <div
      v-if="!selectedInstitution"
      class="title grey--text text--lighten-1 font-weight-light"
    >
      {{ $t("institutions.select_institution_text") }}
    </div>
    <v-card
      v-else
      :key="selectedInstitution.id"
      flat
      max-width="400"
      elevation="0"
    >
      <v-card-text class="mt-0 mb-0">
        <h3 class="pb-2 mt-0 word-break-normal" :class="{ 'pt-10': isScreenSmall }">
          {{ selectedInstitution.name }}
        </h3>
        <div class="blue--text mb-2">
          {{ selectedInstitution.email }}
        </div>
        <div class="blue--text subheading font-weight-bold">
          {{ selectedInstitution.username }}
        </div>
      </v-card-text>

      <v-divider />
      <v-row class="text-left" tag="v-card-text">
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
          {{ $t("institutions.fields.organism") + ":" }}
        </v-col>
        <v-col>{{ selectedInstitution.organism }}</v-col>
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
          {{ $t("institutions.fields.province") + ":" }}
        </v-col>
        <v-col>{{ selectedInstitution.province }}</v-col>
        <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
          {{ $t("institutions.fields.description") + ":" }}
        </v-col>
        <v-col>{{ selectedInstitution.description }}</v-col>
      </v-row>
      <v-card-text>
        <h4 class="headline mb-2">
          {{ $t("institutions.fields.coordinators") }}
          <v-btn icon @click="coordinatorFormDialog = true">
            <v-icon color="primary">
              mdi-plus
            </v-icon>
          </v-btn>
        </h4>
      </v-card-text>
      <v-divider />
      <v-row tag="v-card-text" class="ml-8">
        <v-col
          v-for="(coordinator, key) in selectedInstitution.coordinators"
          :key="coordinator + key"
          class="text-left mr-4 pt-0 pb-0"
          tag="strong"
          cols="auto"
        >
          {{ coordinator.name }}, {{ coordinator.charge }}
          <v-btn icon @click="openCoordinatorDetails(coordinator)">
            <v-icon color="primary">
              mdi-eye
            </v-icon>
          </v-btn>
          <v-btn icon @click="openCoordinatorDetailsForm(coordinator)">
            <v-icon color="primary">
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon @click="coordinatorDeleteDialog = true">
            <v-icon color="primary">
              mdi-delete
            </v-icon>
          </v-btn>
          <!-- This dialog needs to be here, so it can use the key -->
          <material-delete-dialog
            v-model="coordinatorDeleteDialog"
            @accept-click="deleteCoordinator(key)"
          />
        </v-col>
      </v-row>
      <v-dialog v-model="coordinatorDetailsDialog" width="500">
        <app-institution-coordinator-details :coordinator="selectedCoordinator" />
      </v-dialog>
      <v-dialog v-model="coordinatorFormDialog" width="500">
        <app-institution-coordinator-form
          :key="'coordinator' + selectedInstitution.id"
          v-model="coordinatorForm"
          @submit-click="addCoordinator"
          @cancel-click="coordinatorFormDialog = false"
        />
      </v-dialog>
      <v-dialog
        :key="reRenderKey"
        v-model="coordinatorFormDetailsDialog"
        width="500"
      >
        <app-institution-coordinator-details-form
          v-model="selectedCoordinator"
          :coordinator="selectedCoordinator"
          @submit-click="addCoordinatorDetails"
          @cancel-click="coordinatorFormDetailsDialog = false"
        />
      </v-dialog>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'InstitutionDetails',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    isScreenSmall: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      reRenderKey: 0,
      coordinatorForm: {
        name: '',
        charge: ''
      },
      selectedCoordinator: {},
      coordinatorDetailsDialog: false,
      coordinatorDeleteDialog: false,
      coordinatorFormDialog: false,
      coordinatorFormDetailsDialog: false
    }
  },
  computed: {
    ...mapGetters('institution', ['institutionsById']),
    selectedInstitution () {
      return this.institutionsById.get(this.id)[0]
    }
  },
  methods: {
    ...mapActions('institution', { addCoordinatorToStore: 'addCoordinator' }),
    openCoordinatorDetails (coordinator) {
      this.selectedCoordinator = coordinator
      this.coordinatorDetailsDialog = true
    },
    openCoordinatorDetailsForm (coordinator) {
      this.reRenderKey++
      this.selectedCoordinator = coordinator
      this.coordinatorFormDetailsDialog = true
    },
    addCoordinator () {
      this.selectedInstitution.coordinators.push(this.coordinatorForm)
      this.submitDetails()
      this.coordinatorFormDialog = false
    },
    addCoordinatorDetails () {
      this.submitDetails()
      this.coordinatorFormDetailsDialog = false
    },
    deleteCoordinator (index) {
      this.selectedInstitution.coordinators.splice(index - 1, 1)
      this.coordinatorDeleteDialog = false
      this.$emit('coordinator-delete')
    },
    submitDetails () {
      this.$emit('submit-details')
    }
  }
}
</script>

<style>
</style>
