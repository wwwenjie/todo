import React from 'react'
import { List, DatePicker, Button } from 'antd'
import { Task } from '../App'
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons/lib'

const { RangePicker } = DatePicker

interface Props {
  task: Task
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
}

const TodoListItem: React.FC<Props> = (Props) => {
  return (
    <div className='d-flex justify-start align-center'>
      <Button
        key='status'
        type='ghost'
        shape='circle'
        icon={Props.task.completed ? <CheckOutlined /> : <ClockCircleOutlined />}
        className='ml-2'
        onClick={() => { Props.onStatusChange(Props.task.uuid) }}
      />
      <List.Item
        actions={[
          <Button
            key='delete'
            type='primary'
            shape='circle'
            icon={<CloseOutlined />}
            danger
            onClick={() => { Props.onDelete(Props.task.uuid) }}
          />
        ]}
        className='todo-list-item'
      >
        {Props.task.name}
        {/* todo: date support */}
        {/* <RangePicker */}
        {/*  size='small' */}
        {/*  bordered={false} */}
        {/*  className='ml-2' */}
        {/* /> */}
      </List.Item>
    </div>
  )
}

export default TodoListItem
