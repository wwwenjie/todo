import React from 'react'
import { List, Card } from 'antd'
import TodoListItem from './TodoListItem'
import { Task } from '../App'

interface Props {
  taskList: Task[]
  cardTitle: string
  // true: todo false: completed
  inProgress?: boolean
}

const TodoList: React.FC<Props> = (Props) => {
  return (
    <Card
      title={Props.cardTitle}
      // completed list behind todo list
      className={Props.inProgress === true ? 'mt-n4 mt-sm-0' : 'mt-2 mt-sm-6 mt-md-8 mt-lg-10'}
    >
      <List
        size='large'
        dataSource={Props.taskList.filter(task => {
          return Props.inProgress === true ? !task.completed : task.completed
        })}
        renderItem={(task) => (
          <TodoListItem
            task={task}
          />
        )}
      />
    </Card>
  )
}

export default TodoList
