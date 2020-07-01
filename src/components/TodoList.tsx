import React from 'react'
import { List, Card } from 'antd'
import TodoListItem from './TodoListItem'
import { Task } from '../App'

interface Props {
  taskList: Task[]
  cardTitle?: string
}

const TodoList: React.FC<Props> = (Props) => {
  return (
    <div>
      <Card
        title='Todo'
      >
        <List
          size='large'
          dataSource={Props.taskList}
          renderItem={(task) => (
            <TodoListItem
              task={task}
            />
          )}
        />
      </Card>
      <Card
        title='Completed'
        className='mt-2 mt-sm-6 mt-md-8 mt-lg-10'
      >
        <List
          size='large'
          dataSource={Props.taskList}
          renderItem={(task) => (
            <TodoListItem
              task={task}
            />
          )}
        />
      </Card>
    </div>
  )
}

export default TodoList
