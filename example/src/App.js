import React from 'react'
import { CreateAccount, AccountInfo } from 'eoscr-components'
import 'eoscr-components/dist/index.css'

import Info from './infoComponent'

const App = () => {
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
        componentName='AccountInfo'
        properties={[]}
      />
      <AccountInfo />
    </div>
  )
}

export default App
