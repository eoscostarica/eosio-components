function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

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

var InputText = function InputText(_ref) {
  var _classNames, _classNames2;

  var placeholder = _ref.placeholder,
      label = _ref.label,
      errorMessage = _ref.errorMessage,
      isRequired = _ref.isRequired,
      isError = _ref.isError,
      handleOnChange = _ref.handleOnChange,
      props = _objectWithoutPropertiesLoose(_ref, ["placeholder", "label", "errorMessage", "isRequired", "isError", "handleOnChange"]);

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.formGroup
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "text",
    placeholder: placeholder,
    required: isRequired,
    onChange: handleOnChange
  }, props)), /*#__PURE__*/React__default.createElement("label", {
    className: classnames(styles.inputLabel, (_classNames = {}, _classNames[styles.inputLabelWithPlaceholder] = placeholder, _classNames[styles.inputLabelError] = isError, _classNames))
  }, label), /*#__PURE__*/React__default.createElement("i", {
    className: classnames(styles.bar, (_classNames2 = {}, _classNames2[styles.barError] = isError, _classNames2))
  }), isError && /*#__PURE__*/React__default.createElement("span", {
    className: styles.inputErrorMessage
  }, "**" + errorMessage));
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

var DEFAULT_MESSAGE = 'This field is required';
var INITIAL_VALUES = {
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

var CreateAccount = function CreateAccount(_ref) {
  var onHandleSubmit = _ref.onHandleSubmit;

  var _useState = React.useState(INITIAL_VALUES),
      values = _useState[0],
      setValues = _useState[1];

  var handleOnSubmit = function handleOnSubmit() {
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
      accountName: _extends({}, values.accountName, {
        error: !values.accountName.value.length ? DEFAULT_MESSAGE : ''
      }),
      ownerPK: _extends({}, values.ownerPK, {
        error: !values.activePK.value.length ? DEFAULT_MESSAGE : ''
      }),
      activePK: _extends({}, values.activePK, {
        error: !values.ownerPK.value.length ? DEFAULT_MESSAGE : ''
      })
    });
  };

  var handleChange = function handleChange(event) {
    var _extends2;

    event.preventDefault();
    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
    var error = '';
    var isValid = false;

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

    setValues(_extends({}, values, (_extends2 = {}, _extends2[name] = {
      isRequired: true,
      value: value,
      error: error,
      isValid: isValid
    }, _extends2)));
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React__default.createElement("form", null, /*#__PURE__*/React__default.createElement("h1", null, "Create Account"), /*#__PURE__*/React__default.createElement(InputText, {
    label: "Account Name",
    placeholder: "eoscrtest123",
    isRequired: true,
    autoComplete: "off",
    name: "accountName",
    handleOnChange: handleChange,
    isError: Boolean(values.accountName.error),
    errorMessage: values.accountName.error
  }), /*#__PURE__*/React__default.createElement(InputText, {
    label: "Owner Public Key",
    placeholder: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    isRequired: true,
    autoComplete: "off",
    name: "ownerPK",
    handleOnChange: handleChange,
    isError: Boolean(values.ownerPK.error),
    errorMessage: values.ownerPK.error
  }), /*#__PURE__*/React__default.createElement(InputText, {
    label: "Active Public Key",
    placeholder: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    isRequired: true,
    autoComplete: "off",
    name: "activePK",
    handleOnChange: handleChange,
    isError: Boolean(values.activePK.error),
    errorMessage: values.activePK.error
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles.buttonContainer
  }, /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    className: styles.button,
    onClick: handleOnSubmit
  }, /*#__PURE__*/React__default.createElement("span", null, "Submit")))));
};

CreateAccount.propTypes = {
  onHandleSubmit: PropTypes.func
};
CreateAccount.defaultProps = {
  onHandleSubmit: function onHandleSubmit() {
    return console.log('click Submit button');
  }
};

var ModalBase = function ModalBase(_ref) {
  var _classNames, _classNames2;

  var open = _ref.open,
      children = _ref.children,
      onHandleClick = _ref.onHandleClick,
      closeItem = _ref.closeItem;
  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames(styles.Modal, (_classNames = {}, _classNames[styles.Overlay] = open, _classNames))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: classnames(styles.contentWrapper, (_classNames2 = {}, _classNames2[styles.contentOpen] = open, _classNames2))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles.close,
    onClick: onHandleClick
  }, closeItem), /*#__PURE__*/React__default.createElement("div", {
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
  onHandleClick: function onHandleClick() {},
  closeItem: 'X'
};

exports.CreateAccount = CreateAccount;
exports.InputText = InputText;
exports.Modal = ModalBase;
//# sourceMappingURL=index.js.map
