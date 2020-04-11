import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const ModalBase = ({ open, children, onHandleClick, closeItem }) => {
  return (
    <div
      className={classNames(styles.Modal, {
        [styles.Overlay]: open
      })}
    >
      <div
        className={classNames(styles.contentWrapper, {
          [styles.contentOpen]: open
        })}
      >
        <div className={styles.close} onClick={onHandleClick}>
          {closeItem}
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}

ModalBase.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
  onHandleClick: PropTypes.func,
  closeItem: PropTypes.any
}

ModalBase.defaultProps = {
  open: false,
  children: null,
  onHandleClick: () => {},
  closeItem: 'X'
}

export default ModalBase
