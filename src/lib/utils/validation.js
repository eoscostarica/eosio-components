const urlInputValidation = (value) => {
  const urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

  return !value || urlRegex.test(value)
}

const emailInputValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return emailRegex.test(email)
}

const formInputValidation = (formData) => {
  const result = {
    candidate_name: {
      isError: !!!formData.candidate_name,
      message: 'Candidate Name is required'
    },
    email: {
      isError: !!!formData.email || !emailInputValidation(formData.email),
      message: !!formData.email ? 'Invalid Email format' : 'Email is required'
    },
    website: {
      isError: !!!formData.website || !urlInputValidation(formData.website),
      message: !!formData.website
        ? 'Invalid format to URL for Website'
        : 'Website is required'
    },
    code_of_conduct: {
      isError:
        !!!formData.code_of_conduct ||
        !urlInputValidation(formData.code_of_conduct),
      message: !!formData.code_of_conduct
        ? 'Invalid format to URL for Code of Conduct'
        : 'Code of Conduct is required'
    },
    ownership_disclosure: {
      isError:
        !!!formData.code_of_conduct ||
        !urlInputValidation(formData.code_of_conduct),
      message: !!formData.code_of_conduct
        ? 'Invalid format to URL for Ownership Disclosure'
        : 'Ownership Disclosure is required'
    }
  }

  return {
    formValidated: result,
    isValidForm:
      !result.candidate_name.isError &&
      !result.email.isError &&
      !result.website.isError &&
      !result.code_of_conduct.isError &&
      !result.ownership_disclosure.isError
  }
}

const latitudeValidation = (latitude) => {
  return latitude <= 90 && latitude >= -90
}

const longitudeValidation = (latitude) => {
  return latitude <= 180 && latitude >= -180
}

const countryValidation = (code) => {
  const isoRegex = /^[A-Z]{2}$/

  return !code || isoRegex.test(code)
}

const hostValidation = (endpoint) => {
  const hostRegex = /\w:[0-9]/

  return !endpoint || hostRegex.test(endpoint)
}

const Validator = {
  latitudeValidation,
  longitudeValidation,
  countryValidation,
  hostValidation,
  urlInputValidation,
  emailInputValidation,
  formInputValidation
}

export { Validator }