import { BackTop, Button } from 'antd'
import { UpOutlined } from '@ant-design/icons/lib'
import React from 'react'

const BackButton: React.FC = () => {
  return (
    <BackTop
      visibilityHeight={200}
    >
      <Button
        type='primary'
        size='large'
        shape='circle'
        icon={<UpOutlined style={{ color: 'white' }} />}
      />
    </BackTop>
  )
}

export default BackButton
