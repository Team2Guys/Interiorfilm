import React, { SetStateAction } from 'react'
import { Modal } from 'antd';
import { ModalFuncProps } from 'antd';

interface modelProps extends ModalFuncProps {
  children: React.ReactNode
  setproductDetailModel: React.Dispatch<SetStateAction<boolean>>
  productDetailModel: boolean
}

export default function Model({ children, centered, footer, productDetailModel, setproductDetailModel }: modelProps) {
  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        width={1200}
        centered={centered}
        open={productDetailModel}
        onCancel={() => { setproductDetailModel(false) }}
        footer={footer}


      >
        {children}
      </Modal>
    </>
  )
}
