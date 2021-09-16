import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";

import Styles from "./styles";

const useStyles = makeStyles(Styles);

const ArrayTextField = ({
  value,
  onChange,
  className,
  ChipProps = {},
  ...props
}) => {
  const classes = useStyles();
  const [items, setItems] = useState(value);
  const [item, setItem] = useState("");

  const handleOnAddItem = () => {
    if (!item) {
      return;
    }

    const newValue = [...items, item];
    setItems(newValue);
    setItem("");
    onChange && onChange(newValue);
  };

  const handleDeleteItem = (index) => {
    items.splice(index, 1);
    setItems([...items]);
  };

  const handleOnKeyPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleOnAddItem();
  };

  useEffect(() => {
    let newItems = [];

    if (Array.isArray(value)) {
      newItems = value;
    }

    if (typeof value === "string") {
      newItems = [value];
    }

    if (typeof value === "object") {
      try {
        newItems = Object.values(value);
      } catch (error) {}
    }

    setItems(newItems);
  }, [value]);

  return (
    <Box className={clsx(classes.root, className)}>
      <TextField
        {...props}
        value={item}
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
          ),
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
  );
};

ArrayTextField.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string,
  ChipProps: PropTypes.object,
};

ArrayTextField.defaultProps = {
  value: [],
};

export default ArrayTextField;
