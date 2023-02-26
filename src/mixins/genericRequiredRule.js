export default {
  methods: {
    genericRequiredRule (v, message) {
      return [v => !!v || `${message}`]
    }
  }
}
