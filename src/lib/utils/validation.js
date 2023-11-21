const isString = (value) => {
  return typeof value == 'string'
}

const isNumber = (value) => {
  return typeof value == 'number'
}
const isBoolean = (value) => {
  return typeof value === 'boolean'
}

const urlInputValidation = (value) => {
  const urlRegex =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/

  return !value || (isString(value) && urlRegex.test(value))
}

const emailInputValidation = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return isString(email) && emailRegex.test(email)
}

const requiredValidation = (value) => {
  return isString(value) && value.trim().length > 0
}

const latitudeValidation = (latitude) => {
  return isNumber(latitude) && latitude <= 90 && latitude >= -90
}

const longitudeValidation = (longitude) => {
  return isNumber(longitude) && longitude <= 180 && longitude >= -180
}

const countryValidation = (code) => {
  const isoRegex = /^[A-Z]{2}$/

  return isString(code) && isoRegex.test(code)
}

const hostValidation = (endpoint) => {
  const hostRegex = /\w:[0-9]/

  return !endpoint || (isString(endpoint) && hostRegex.test(endpoint))
}

const validate = (obj, schema) => {
  if (obj === undefined) return false

  return Object.keys(schema).every((key) => {
    if (obj[key] === undefined) {
      return !schema[key].isRequired
    }

    if (Array.isArray(obj[key])) {
      return obj[key].every((sub) => {
        return schema[key].isValid(sub)
      })
    }

    return schema[key].isValid(obj[key])
  })
}

const Validator = {
  countryValidation,
  emailInputValidation,
  hostValidation,
  latitudeValidation,
  longitudeValidation,
  urlInputValidation,
  requiredValidation,
  isBoolean,
  validate
}

export { Validator }
