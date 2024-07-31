import Button from 'components/Common/Button'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import Checkout from 'components/ui/Checkout/Checkout'
import React from 'react'

const CheckOut = () => {
  return (
    <>
        <Overlay title='Checkout'/>
        <Checkout/>
      
    </>
  )
}

export default CheckOut