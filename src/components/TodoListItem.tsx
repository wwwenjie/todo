import React from 'react'
import { List } from 'antd'

const TodoListItem: React.FC = () => {
  return (
    <List.Item
      actions={[
      ]}
      className='list-item'
    >
      Todo List
    </List.Item>
  )
}

export default TodoListItem
