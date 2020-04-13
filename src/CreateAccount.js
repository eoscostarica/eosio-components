import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import InputText from './InputText'
import styles from './styles.module.css'

const DEFAULT_MESSAGE = 'This field is required'
const INITIAL_VALUES = {
  accountName: {
    value: '',
    error: '',
    isRequired: true,
    isValid: false
  },
  ownerPK: {
    value: '',
    error: '',
    isRequired: true,
    isValid: false
  },
  activePK: {
    value: '',
    error: '',
    isRequired: true,
    isValid: false
  }
}

const CreateAccount = ({ onHandleSubmit }) => {
  const [values, setValues] = useState(INITIAL_VALUES)

  const handleOnSubmit = () => {
    if (
      values.accountName.isValid &&
      values.activePK.isValid &&
      values.ownerPK.isValid
    ) {
      onHandleSubmit({
        accountName: values.accountName.value,
        ownerPK: values.activePK.value,
        activePK: values.ownerPK.value
      })

      setValues(INITIAL_VALUES)

      return
    }

    setValues({
      accountName: {
        ...values.accountName,
        error: !values.accountName.value.length ? DEFAULT_MESSAGE : ''
      },
      ownerPK: {
        ...values.ownerPK,
        error: !values.activePK.value.length ? DEFAULT_MESSAGE : ''
      },
      activePK: {
        ...values.activePK,
        error: !values.ownerPK.value.length ? DEFAULT_MESSAGE : ''
      }
    })
  }

  const handleChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    let error = ''
    let isValid = false

    switch (name) {
      case 'accountName':
        if (value.length < 12) {
          error = 'a-z,1-5 are allowed only. Length 12'
        } else {
          error = ''
          isValid = true
        }
        break
      case 'ownerPK':
        if (value.length < 54) {
          error = 'Owner Public Key is not valid!'
        } else {
          error = ''
          isValid = true
        }
        break
      case 'activePK':
        if (value.length < 54) {
          error = 'Public Public Key is not valid!'
        } else {
          error = ''
          isValid = true
        }
        break
      default:
        break
    }

    setValues({
      ...values,
      [name]: { isRequired: true, value, error, isValid }
    })
  }

  return (
    <div className={styles.container}>
      <form>
        <h1>Create Account</h1>
        <InputText
          label='Account Name'
          placeholder='eoscrtest123'
          isRequired
          autoComplete='off'
          name='accountName'
          handleOnChange={handleChange}
          isError={Boolean(values.accountName.error)}
          errorMessage={values.accountName.error}
        />
        <InputText
          label='Owner Public Key'
          placeholder='EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
          isRequired
          autoComplete='off'
          name='ownerPK'
          handleOnChange={handleChange}
          isError={Boolean(values.ownerPK.error)}
          errorMessage={values.ownerPK.error}
        />
        <InputText
          label='Active Public Key'
          placeholder='EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
          isRequired
          autoComplete='off'
          name='activePK'
          handleOnChange={handleChange}
          isError={Boolean(values.activePK.error)}
          errorMessage={values.activePK.error}
        />
        <div className={styles.buttonContainer}>
          <button type='button' className={styles.button} onClick={handleOnSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  )
}

CreateAccount.propTypes = {
  onHandleSubmit: PropTypes.func
}

CreateAccount.defaultProps = {
  onHandleSubmit: () => console.log('click Submit button')
}

export default CreateAccount
