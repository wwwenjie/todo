import React from 'react'
import { List, DatePicker } from 'antd'
import { Task } from '../App'

const { RangePicker } = DatePicker

interface Props {
  task: Task
}

const TodoListItem: React.FC<Props> = (Props) => {
  return (
    <List.Item
      actions={[]}
      className='list-item'
    >
      {Props.task.name}
      {/* todo: date support */}
      {/* <RangePicker */}
      {/*  size='small' */}
      {/*  bordered={false} */}
      {/*  className='ml-2' */}
      {/* /> */}
    </List.Item>
  )
}

export default TodoListItem
