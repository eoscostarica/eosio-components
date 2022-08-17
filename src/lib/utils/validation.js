import { NODE_TYPES } from "./constants"

const urlInputValidation = (value) => {
  const urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

  return !value || urlRegex.test(value)
}

const emailInputValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return emailRegex.test(email)
}

const requiredValidation = (value) => {
  return typeof (value) == "string" && value.trim().length > 0
}

const latitudeValidation = (latitude) => {
  return latitude <= 90 && latitude >= -90
}

const longitudeValidation = (latitude) => {
  return latitude <= 180 && latitude >= -180
}

const countryValidation = (code) => {
  const isoRegex = /^[A-Z]{2}$/

  return isoRegex.test(code)
}

const hostValidation = (endpoint) => {
  const hostRegex = /\w:[0-9]/

  return !endpoint || hostRegex.test(endpoint)
}

const nodeTypeValidation = (value) => {
  return Object.values(NODE_TYPES).indexOf(value) > -1
}

const isBoolean = (value) => {
  return typeof (value) === "boolean";
}

const validate = (obj, schema) => {

  if (obj === undefined) return false

  return Object.keys(schema).every((key) => {

    if (obj[key] === undefined) return !schema[key].isRequired

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
  nodeTypeValidation,
  isBoolean,
  validate
}

export { Validator }