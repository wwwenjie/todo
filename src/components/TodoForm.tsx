import React from 'react'
import { Form, Row, Col, Button, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../App'
// import { useDispatch, useSelector } from 'react-redux'
// import { TaskState, Task } from '../redux/types'
// import { addTask } from '../redux/actions'

interface Props {
  placeholder: string
  buttonText: string
  handleSubmit: (task: Task) => void
}

const TodoForm: React.FC<Props> = (Props) => {
  // const tasks = useSelector((state: TaskState) => state.tasks)
  // const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (): void => {
    Props.handleSubmit({
      uuid: uuidv4(),
      name: form.getFieldValue('taskName'),
      completed: false,
      createDate: new Date()
    })
    // test handle in redux
    // dispatch(addTask(form.getFieldValue('taskName')))
    form.resetFields()
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      {/* {JSON.stringify(tasks)} */}
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
