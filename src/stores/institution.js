import { defineStore } from "pinia";
import { Indexer } from "basic-indexer";

const INSTITUTION_FORM_TEMPLATE = {
  name: "",
  province: "Villa Clara",
  organism: "",
  coordinators: [],
  description: "",
};

export const useInstitutionStore = defineStore("institution", {
  state: () => ({
    institutions: [],
    institutionForm: Object.assign({}, INSTITUTION_FORM_TEMPLATE),
  }),

  getters: {
    isLogged: (state) => !!state.token,
    institutionsById() {
      return new Indexer(this.institutions ?? [], "id", true);
    },
  },

  actions: {
    setInstitutions(institutions) {
      this.institutions = institutions;
    },
    addInstitution(institution) {
      this.institutions.push(institution);
    },
    updateInstitution(id, newInstitutionData) {
      const index = this.institutions.findIndex(
        (institution) => institution.id === id
      );
      this.institutions.splice(index, 1, newInstitutionData);
    },
    deleteInstitution(id) {
      const index = this.institutions.findIndex(
        (institution) => institution.id === id
      );
      this.institutions.splice(index, 1);
    },
    setFormData(form) {
      const keys = Object.keys(this.institutionForm);
      for (const key of keys) {
        this.institutionForm[key] = form[key];
      }
    },
    clearForm: () => (this.institutionForm = { ...INSTITUTION_FORM_TEMPLATE }),
    addCoordinator(id, newCoordinator) {
      const index = this.institutions.findIndex((institution) => {
        return institution.id === id;
      });
      this.institutions[index].coordinators.push(newCoordinator);
    },
  },
});
