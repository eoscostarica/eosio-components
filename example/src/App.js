import React, { useState } from 'react'
import { CreateAccount, InputText, Modal } from 'eoscr-components'
import 'eoscr-components/dist/index.css'

import Info from './infoComponent'

const App = () => {
  const [open, setOpen] = useState(false)

  const buttonClick = () => {
    setOpen(!open)
  }

  const onHandleCreateAccountClick = values => console.log({ values })

  return (
    <div className={'container'}>
      <Info
        componentName='CreateAccount'
        properties={[
          { value: '={(data) => yourFunction(data)}', label: 'onHandleSubmit' }
        ]}
      />
      <CreateAccount onHandleSubmit={onHandleCreateAccountClick} />
      <Info
        componentName='InputText'
        properties={[
          { value: '="Name"', label: 'label' },
          { value: null, label: 'isRequired' },
          { value: null, label: 'isError' },
          { value: '="placeholder text here"', label: 'placeholder' },
          { value: '="error message here"', label: 'errorMessage' },
          {
            value: '={(value) => yourFunction(value)}',
            label: 'handleOnChange'
          }
        ]}
      />
      <div className={'boxMargin'}>
        <InputText label='Name' isRequired />
      </div>
      <Info
        hasChildren
        componentName='Modal'
        properties={[
          { value: '={true}', label: 'open' },
          { value: '="X"', label: 'closeItem' },
          { value: '={() => yourFunction()}', label: 'onHandleClick' }
        ]}
      />
      <Modal open={open} onHandleClick={buttonClick}>
        <CreateAccount />
      </Modal>
      <div className={'modalBoxBtn'}>
        <button className={'botonModal'} onClick={buttonClick}>
          CLICK TO SHOW MODAL!
        </button>
      </div>
    </div>
  )
}

export default App
