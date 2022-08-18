import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import Chip from '@mui/material/Chip'


import Styles from './styles'

const useStyles = makeStyles(Styles)

const ArrayTextField = ({
  value,
  onChange,
  className,
  ChipProps = {},
  ArrayValidator,
  ...props
}) => {
  const classes = useStyles()
  const [items, setItems] = useState(value)
  const [item, setItem] = useState('')

  const handleOnAddItem = () => {
    console.log("test")
    if (!item || !ArrayValidator(item)) {
      return
    }

    const newValue = [...items, item]
    setItems(newValue)
    setItem('')
    onChange && onChange(newValue)
  }

  const handleDeleteItem = (index) => {
    items.splice(index, 1)
    setItems([...items])
    onChange && onChange(items)
  }

  const handleOnKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    handleOnAddItem()
  }

  useEffect(() => {
    let newItems = []

    if (Array.isArray(value)) {
      newItems = value
    }

    if (typeof value === 'string') {
      newItems = [value]
    }

    if (typeof value === 'object') {
      try {
        newItems = Object.values(value)
      } catch (error) { }
    }

    setItems(newItems)
  }, [value])
  return (
    <Box className={clsx(classes.root, className)}>
      <TextField
        {...props}
        value={item}
        error={!ArrayValidator(item)}
        helperText={
          !ArrayValidator(item) && 'Invalid URL'
        }
        onChange={(event) => setItem(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment
              className={classes.btn}
              onClick={handleOnAddItem}
              position="end"
            >
              <AddIcon />
            </InputAdornment>
          )
        }}
        onKeyPress={handleOnKeyPress}
      />
      <Box>
        {items.map((item, index) => (
          <Chip
            {...ChipProps}
            label={item}
            className={classes.chip}
            onDelete={(a) => handleDeleteItem(index)}
            key={`chip-item-${item}-${index}`}
          />
        ))}
      </Box>
    </Box>
  )
}

ArrayTextField.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  ArrayValidator: PropTypes.func,
  className: PropTypes.string,
  ChipProps: PropTypes.object
}

ArrayTextField.defaultProps = {
  value: [],
  ArrayValidator: (item) => { return false }
}

export default ArrayTextField
