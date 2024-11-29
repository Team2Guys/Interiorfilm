import React, { SetStateAction } from 'react'
import { Modal } from 'antd';
import { ModalFuncProps } from 'antd';

interface modelProps extends ModalFuncProps {
  children: React.ReactNode
  setproductDetailModel: React.Dispatch<SetStateAction<boolean>>
  productDetailModel: boolean
}

export default function Model({ children, centered, footer, productDetailModel, setproductDetailModel,title }: modelProps) {
  return (
    <>
      <Modal
        title={title}
        width={1400}
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
