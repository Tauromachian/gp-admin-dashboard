function normalizeForm (form) {
  let normalizedFormObject = {}
  for (const attribute in form) {
    const normalizedAttribute = attribute.replace('Computed', '')
    normalizedFormObject[normalizedAttribute] = form[attribute]
  }
  return normalizedFormObject
}

module.exports = {
  normalizeForm
}
