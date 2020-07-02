import React, { useState } from 'react'
import { List, Card, Button } from 'antd'
import TodoListItem from './TodoListItem'
import { Task } from '../App'
import { DownOutlined, RightOutlined } from '@ant-design/icons/lib'

interface Props {
  taskList: Task[]
  cardTitle: string
  // true: todo false: completed
  inProgress: boolean
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
  onSave: (task: Task) => void
}

const TodoList: React.FC<Props> = (Props) => {
  const [show, setShow] = useState<boolean>(true)

  const CardList: React.FC = () => {
    return (
      /* eslint-disable react/jsx-handler-names */
      <List
        size='large'
        dataSource={Props.taskList.filter(task => {
          return Props.inProgress ? !task.completed : task.completed
        })}
        renderItem={task => (
          <TodoListItem
            task={task}
            onStatusChange={Props.onStatusChange}
            onDelete={Props.onDelete}
            onSave={Props.onSave}
          />
        )}
      />
    )
  }

  const CardCount: React.FC = () => {
    return (
      <span>{Props.taskList.reduce((acc, cur) => {
        if (Props.inProgress && !cur.completed) return ++acc
        if (!Props.inProgress && cur.completed) return ++acc
        return acc
      }, 0)} tasks
      </span>
    )
  }

  return (
    <Card
      title={
        <Button
          size='large'
          onClick={() => { setShow(!show) }}
        >
          {show ? <DownOutlined /> : <RightOutlined />}
          {Props.cardTitle}
        </Button>
      }
      // completed list behind todo list
      className={Props.inProgress ? 'mt-n4 mt-sm-0' : 'mt-2 mt-sm-6 mt-md-8 mt-lg-10'}
    >
      {show ? <CardList /> : <CardCount />}
    </Card>
  )
}

export default TodoList
