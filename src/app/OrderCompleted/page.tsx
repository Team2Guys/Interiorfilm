import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React from 'react'
import { OrderCompleted } from 'components/ui/OrderCompleted/OrderCompleted'

const CheckOut = () => {
  return (
    <>
        <Overlay title='Order Completed'/>
        <Container className='mt-10'>
        <OrderCompleted/>
        </Container>
    </>
  )
}

export default CheckOut