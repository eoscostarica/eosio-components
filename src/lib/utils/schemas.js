import { Validator } from "./validation"

const {
  requiredValidation,
  emailInputValidation,
  countryValidation,
  latitudeValidation,
  longitudeValidation,
  nodeTypeValidation,
  urlInputValidation,
  isBoolean,
  hostValidation,
  validate
} = Validator

const requiredUrlValidation = (value) => {
  return requiredValidation(value) && urlInputValidation(value)
}

const locationSchema = {
  name: { isValid: requiredValidation, isRequired: true, message: 'The name is required' },
  country: { isValid: countryValidation, isRequired: true, message: 'The country code must be two letters' },
  latitude: { isValid: latitudeValidation, isRequired: false, message: 'The latitude range is between -90 and 90' },
  longitude: { isValid: longitudeValidation, isRequired: false, message: 'The longitude range is between -180 and 180' }
}
const nodeSchema = {
  node_type: { isValid: nodeTypeValidation, isRequired: true },
  full: { isValid: isBoolean, isRequired: true },
  location: { isValid: (obj) => validate(obj, locationSchema), isRequired: false },
  api_endpoint: { isValid: urlInputValidation, isRequired: false },
  ssl_endpoint: { isValid: urlInputValidation, isRequired: false },
  p2p_endpoint: { isValid: hostValidation, isRequired: false }
}
const orgSchema = {
  candidate_name: { isValid: requiredValidation, isRequired: true, message: 'Candidate Name is required' },
  website: { isValid: requiredUrlValidation, isRequired: true, message: 'Invalid URL' },
  email: { isValid: emailInputValidation, isRequired: true, message: 'Invalid Email format' },
  code_of_conduct: { isValid: requiredUrlValidation, isRequired: true, message: 'Invalid URL' },
  ownership_disclosure: { isValid: requiredUrlValidation, isRequired: true, message: 'Invalid URL' },
  chain_resources: { isValid: urlInputValidation, isRequired: false },
  other_resources: { isValid: urlInputValidation, isRequired: false },
  location: { isValid: (obj) => validate(obj, locationSchema), isRequired: true },
}
const bpSchema = {
  org: { isValid: (obj) => validate(obj, orgSchema), isRequired: true },
  nodes: { isValid: (obj) => validate(obj, nodeSchema), isRequired: false }
}
export {
  locationSchema,
  nodeSchema,
  orgSchema,
  bpSchema
}