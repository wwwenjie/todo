import React from 'react'
import { Form, Row, Col, Button, Input } from 'antd'
import { Task } from '../App'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  placeholder: string
  buttonText: string
  handleSubmit: (task: Task) => void
}

const TodoForm: React.FC<Props> = (Props) => {
  const [form] = Form.useForm()

  const onFinish = (): void => {
    Props.handleSubmit({
      uuid: uuidv4(),
      name: form.getFieldValue('taskName'),
      completed: false,
      createDate: new Date()
    })
    form.resetFields()
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Row
        justify='space-between'
      >
        <Col span={20}>
          <Form.Item
            name='taskName'
            rules={[{ required: true, message: 'Task is empty' }]}
          >
            <Input
              type='text'
              placeholder={Props.placeholder}
              size='large'
              allowClear
            />
          </Form.Item>
        </Col>
        <Col
          xs={4}
          lg={3}
        >
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            className='todo-input-button'
          >
            {Props.buttonText}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TodoForm
