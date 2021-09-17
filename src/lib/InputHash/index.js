import React, { useState } from 'react'
import sha256 from 'sha256'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  hashResult: {
    marginTop: theme.spacing(1),
    wordWrap: 'break-word'
  }
}))

const SHA256_REGEX_VALIDATOR = /\b[A-Fa-f0-9]{64}\b/

const InputHash = ({
  handleOnChange,
  messageError,
  useHashValidator,
  label,
  variant,
  messageSuccess,
  ...props
}) => {
  const classes = useStyles()
  const [hash, setHash] = useState(null)
  const [value, setValue] = useState('')
  const [isValidHash, setIsValidHash] = useState(false)
  const helperText = value.length ? messageSuccess : ''
  const extraProps = useHashValidator
    ? {
        error: Boolean(value.length) && !isValidHash,
        helperText: value.length && !isValidHash ? messageError : helperText
      }
    : {}

  const handleInputHashValidator = (value) => {
    const isHasValid = SHA256_REGEX_VALIDATOR.test(value)

    value.length ? setIsValidHash(isHasValid) : setHash(null)
    handleOnChange({ hash: value, isValid: isHasValid })
  }

  const handleInputHashCreator = (value) => {
    const result = sha256(value)

    value.length ? setHash(sha256(result)) : setHash(null)
    handleOnChange(result)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target

    useHashValidator
      ? handleInputHashValidator(value)
      : handleInputHashCreator(value)
    setValue(value)
  }

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        label={label}
        variant={variant}
        onChange={handleChange}
        {...extraProps}
        {...props}
      />
      <Typography variant="subtitle2" className={classes.hashResult}>
        {hash}
      </Typography>
    </div>
  )
}

InputHash.propTypes = {
  handleOnChange: PropTypes.func,
  messageError: PropTypes.string,
  messageSuccess: PropTypes.string,
  useHashValidator: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string
}

InputHash.defaultProps = {
  handleOnChange: () => {},
  messageError: 'Incorrect hash',
  messageSuccess: 'Hash is correct',
  useHashValidator: false,
  label: '',
  variant: 'filled'
}

export default InputHash
