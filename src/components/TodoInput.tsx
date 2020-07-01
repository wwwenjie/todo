import React from 'react'
import { Button, Col, Input, Row } from 'antd'

interface Props {
  placeholder: string
  buttonText: string
}

const TodoInput: React.FC<Props> = (Props) => {
  return (
    <Row
      justify='space-between'
    >
      <Col span={20}>
        <Input
          type='text'
          placeholder={Props.placeholder}
          size='large'
          allowClear
        />
      </Col>
      <Col
        xs={4}
        lg={3}
      >
        <Button
          type='primary'
          size='large'
          className='todo-input-button'
        >
          {Props.buttonText}
        </Button>
      </Col>
    </Row>
  )
}

export default TodoInput
