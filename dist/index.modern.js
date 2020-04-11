import React, { useState } from 'react';
import PropTypes from 'prop-types';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var styles = {"container":"_styles-module__container__1Lxpd","form-inline":"_styles-module__form-inline__5z7-b","formGroup":"_styles-module__formGroup__3CEBj","btn":"_styles-module__btn__1Pz2d","inputLabel":"_styles-module__inputLabel__2SWgM","inputLabelWithPlaceholder":"_styles-module__inputLabelWithPlaceholder__34vu2","bar":"_styles-module__bar__38qu8","barError":"_styles-module__barError__A_crk","form-file":"_styles-module__form-file__3bh1t","has-value":"_styles-module__has-value__4zdAI","inputErrorMessage":"_styles-module__inputErrorMessage__3aVXG","inputLabelError":"_styles-module__inputLabelError__1VwFA","buttonContainer":"_styles-module__buttonContainer__tWHtY","button":"_styles-module__button__2hTXI","contentWrapper":"_styles-module__contentWrapper__tmp4k","contentOpen":"_styles-module__contentOpen__ZBdvX","close":"_styles-module__close__2I1sI","pulse":"_styles-module__pulse__3kSlr","modalContent":"_styles-module__modalContent__3bARu","Modal":"_styles-module__Modal__x7dtN","Overlay":"_styles-module__Overlay__1YOvH"};

const InputText = ({
  placeholder,
  label,
  errorMessage,
  isRequired,
  isError,
  handleOnChange,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.formGroup
  }, /*#__PURE__*/React.createElement("input", Object.assign({
    type: "text",
    placeholder: placeholder,
    required: isRequired,
    onChange: handleOnChange
  }, props)), /*#__PURE__*/React.createElement("label", {
    className: classnames(styles.inputLabel, {
      [styles.inputLabelWithPlaceholder]: placeholder,
      [styles.inputLabelError]: isError
    })
  }, label), /*#__PURE__*/React.createElement("i", {
    className: classnames(styles.bar, {
      [styles.barError]: isError
    })
  }), isError && /*#__PURE__*/React.createElement("span", {
    className: styles.inputErrorMessage
  }, `**${errorMessage}`));
};

InputText.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  isError: PropTypes.bool,
  handleOnChange: PropTypes.func
};
InputText.defaultProps = {
  placeholder: null,
  label: 'Account Name',
  errorMessage: '',
  isRequired: false,
  isError: false
};

const DEFAULT_MESSAGE = 'This field is required';
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
};

const CreateAccount = ({
  onHandleSubmit
}) => {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleOnSubmit = () => {
    if (values.accountName.isValid && values.activePK.isValid && values.ownerPK.isValid) {
      onHandleSubmit({
        accountName: values.accountName.value,
        ownerPK: values.activePK.value,
        activePK: values.ownerPK.value
      });
      setValues(INITIAL_VALUES);
      return;
    }

    setValues({
      accountName: { ...values.accountName,
        error: !values.accountName.value.length ? DEFAULT_MESSAGE : ''
      },
      ownerPK: { ...values.ownerPK,
        error: !values.activePK.value.length ? DEFAULT_MESSAGE : ''
      },
      activePK: { ...values.activePK,
        error: !values.ownerPK.value.length ? DEFAULT_MESSAGE : ''
      }
    });
  };

  const handleChange = event => {
    event.preventDefault();
    const {
      name,
      value
    } = event.target;
    let error = '';
    let isValid = false;

    switch (name) {
      case 'accountName':
        if (value.length < 12) {
          error = 'a-z,1-5 are allowed only. Length 12';
        } else {
          error = '';
          isValid = true;
        }

        break;

      case 'ownerPK':
        if (value.length < 54) {
          error = 'Owner Public Key is not valid!';
        } else {
          error = '';
          isValid = true;
        }

        break;

      case 'activePK':
        if (value.length < 54) {
          error = 'Public Public Key is not valid!';
        } else {
          error = '';
          isValid = true;
        }

        break;
    }

    setValues({ ...values,
      [name]: {
        isRequired: true,
        value,
        error,
        isValid
      }
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("h1", null, "Create Account"), /*#__PURE__*/React.createElement(InputText, {
    label: "Account Name",
    placeholder: "eoscrtest123",
    isRequired: true,
    autoComplete: "off",
    name: "accountName",
    handleOnChange: handleChange,
    isError: Boolean(values.accountName.error),
    errorMessage: values.accountName.error
  }), /*#__PURE__*/React.createElement(InputText, {
    label: "Owner Public Key",
    placeholder: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    isRequired: true,
    autoComplete: "off",
    name: "ownerPK",
    handleOnChange: handleChange,
    isError: Boolean(values.ownerPK.error),
    errorMessage: values.ownerPK.error
  }), /*#__PURE__*/React.createElement(InputText, {
    label: "Active Public Key",
    placeholder: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    isRequired: true,
    autoComplete: "off",
    name: "activePK",
    handleOnChange: handleChange,
    isError: Boolean(values.activePK.error),
    errorMessage: values.activePK.error
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonContainer
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles.button,
    onClick: handleOnSubmit
  }, /*#__PURE__*/React.createElement("span", null, "Submit")))));
};

CreateAccount.propTypes = {
  onHandleSubmit: PropTypes.func
};
CreateAccount.defaultProps = {
  onHandleSubmit: () => console.log('click Submit button')
};

const ModalBase = ({
  open,
  children,
  onHandleClick,
  closeItem
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(styles.Modal, {
      [styles.Overlay]: open
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames(styles.contentWrapper, {
      [styles.contentOpen]: open
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.close,
    onClick: onHandleClick
  }, closeItem), /*#__PURE__*/React.createElement("div", {
    className: styles.modalContent
  }, children)));
};

ModalBase.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
  onHandleClick: PropTypes.func,
  closeItem: PropTypes.any
};
ModalBase.defaultProps = {
  open: false,
  children: null,
  onHandleClick: () => {},
  closeItem: 'X'
};

export { CreateAccount, InputText, ModalBase as Modal };
//# sourceMappingURL=index.modern.js.map
