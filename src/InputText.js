import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const InputText = ({
  placeholder,
  label,
  errorMessage,
  isRequired,
  isError,
  handleOnChange,
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      <input
        type='text'
        placeholder={placeholder}
        required={isRequired}
        onChange={handleOnChange}
        {...props}
      />
      <label
        className={classNames(styles.inputLabel, {
          [styles.inputLabelWithPlaceholder]: placeholder,
          [styles.inputLabelError]: isError
        })}
      >
        {label}
      </label>
      <i
        className={classNames(styles.bar, {
          [styles.barError]: isError
        })}
      ></i>
      {isError && (
        <span className={styles.inputErrorMessage}>{`**${errorMessage}`}</span>
      )}
    </div>
  )
}

InputText.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  isError: PropTypes.bool,
  handleOnChange: PropTypes.func
}

InputText.defaultProps = {
  placeholder: null,
  label: 'Account Name',
  errorMessage: '',
  isRequired: false,
  isError: false
}

export default InputText
