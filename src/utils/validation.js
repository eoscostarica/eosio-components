const urlInputValidation = (value) => {
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/

  return urlRegex.test(value)
}

const emailInputValidation = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return emailRegex.test(email)
}

const formInputValidation = (formData) => {
  const result = {
    candidate_name: {
      isError: !formData.candidate_name.length,
      message: 'Candidate Name is required'
    },
    email: {
      isError: !formData.email.length || !emailInputValidation(formData.email),
      message: formData.email.length
        ? 'Invalid Email format'
        : 'Email is required'
    },
    website: {
      isError:
        !formData.website.length || !urlInputValidation(formData.website),
      message: formData.website.length
        ? 'Invalid format to URL for Website'
        : 'Website is required'
    },
    code_of_conduct: {
      isError:
        !formData.code_of_conduct.length ||
        !urlInputValidation(formData.code_of_conduct),
      message: formData.code_of_conduct.length
        ? 'Invalid format to URL for Code of Conduct'
        : 'Code of Conduct is required'
    }
  }

  return {
    formValidated: result,
    isValidForm:
      !result.candidate_name.isError ||
      !result.email.isError ||
      !result.website.isError ||
      !result.code_of_conduct.isError
  }
}

export { urlInputValidation, emailInputValidation, formInputValidation }
