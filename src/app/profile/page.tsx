"use client"
import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Profile: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Ensure only one file in the fileList
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Overlay title='Profile'/>
      <Container className='mt-10'>
        <div className='flex flex-wrap md:flex-nowrap md:gap-4'>
          <div className='p-2 rounded-md shadow w-full md:w-4/12 hidden md:block'>
            <div className='space-y-2 flex flex-col'>
              <Link className='border p-2 w-96 rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/profile"}>Profile</Link>
              <Link className='border p-2 w-96 rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/wishlist"}>Wishlist</Link>
              <Link className='border p-2 w-96 rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/about"}>About Us</Link>
              <Link className='border p-2 w-96 rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/profile"}>Log Out</Link>
            </div>
          </div>
          <div className='p-4 rounded-md shadow w-full md:w-8/12'>
          <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}

              <div className='grid grid-cols-2 mt-5 md:px-4 space-y-2'>
                    <div>
                        <label className='font-semibold'>Full Name</label>
                        <p className='font-medium'>Muhammad Ahmad</p>
                    </div>
                    <div>
                        <label className='font-semibold'>Phone Number</label>
                        <p className='font-medium'>Muhammad Ahmad</p>
                    </div>
                    <div>
                        <label className='font-semibold'>Email</label>
                        <p className='font-medium'>Muhammad Ahmad</p>
                    </div>
                    <div>
                        <label className='font-semibold'>UserName</label>
                        <p className='font-medium'>Muhammad Ahmad</p>
                    </div>
                  
              </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
