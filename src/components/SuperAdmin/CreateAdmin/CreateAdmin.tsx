import { Col, Form, Row } from 'antd'
import Input from 'components/Common/regularInputs'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import Button from 'components/Common/Button';

const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
const CreateAdmin = ({setselecteMenu}:any) => {
  return (
    <>
    <p className="text-lg font-black mb-4 flex items-center justify-center gap-2
       hover:bg-gray-200 w-fit p-2 cursor-pointer"  onClick={() =>{setselecteMenu('AllAdmin')}}> <IoMdArrowRoundBack />  Back</p>

<Form className='max-w-screen-md mx-auto  p-3 rounded-md shadow mt-1 mb-5' layout="vertical">
        <Row gutter={[10,10]}>
        <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <p className='text-2xl'>Create New Admin</p>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:12}} xs={{order:1,span:24}}>
            <Form.Item label={"First Name"}>
              <Input type='text' name='name' placeholder='First Name'  />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:12}} xs={{order:1,span:24}}>
            <Form.Item label={"Last Name"} >
              <Input type='text' name='name' placeholder='Last Name'  />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:12}} xs={{order:1,span:24}}>
            <Form.Item label={"Email"}>
              <Input type='email' name='email' placeholder='Enter Email'  />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:12}} xs={{order:1,span:24}}>
            <Form.Item label={"Password"}>
              <Input type='password' name='password' placeholder='Enter Password'  />
            </Form.Item>
          </Col>
            <Col xl={{order:1,span:6}} lg={{order:1,span:6}} md={{order:1,span:6}} sm={{order:1,span:12}} xs={{order:1,span:12}}>
            <Checkbox onChange={onChange}>Can Add Product</Checkbox>
            </Col>
            <Col xl={{order:1,span:6}} lg={{order:1,span:6}} md={{order:1,span:6}} sm={{order:1,span:12}} xs={{order:1,span:12}}>
            <Checkbox onChange={onChange}>Can Delete Category</Checkbox>
            </Col>
            <Col xl={{order:1,span:6}} lg={{order:1,span:6}} md={{order:1,span:6}} sm={{order:1,span:12}} xs={{order:1,span:12}}>
            <Checkbox onChange={onChange}>Can Add Category</Checkbox>
            </Col>
            <Col xl={{order:1,span:6}} lg={{order:1,span:6}} md={{order:1,span:6}} sm={{order:1,span:12}} xs={{order:1,span:12}}>
            <Checkbox onChange={onChange}>Can Delete Category</Checkbox>
            </Col>
            <Col xl={{order:1,span:6}} lg={{order:1,span:6}} md={{order:1,span:6}} sm={{order:1,span:12}} xs={{order:1,span:12}}>
            <Checkbox onChange={onChange}>Can Check Profit</Checkbox>
            </Col>
            <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Checkbox onChange={onChange}>Can View Product , Category & User</Checkbox>
            </Col>
            
            <Col className='text-center mt-2' xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Button className='bg-primary text-white w-full' title={"Add Admin"} />
            </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateAdmin