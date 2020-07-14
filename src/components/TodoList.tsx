import React, { useState } from 'react'
import { List, Card, Button, Input, Empty } from 'antd'
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

interface ListProps {
  taskList: Task[]
  inProgress: boolean
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
  onSave: (task: Task) => void
}

interface CountProps {
  taskList: Task[]
  inProgress: boolean
}

const TodoList: React.FC<Props> = (props: Props) => {
  const [show, setShow] = useState<boolean>(true)
  const [searchValueState, setSearchValueState] = useState<string>('')

  const CardList: React.FC<ListProps> = (props: ListProps) => {
    return (
      /* eslint-disable react/jsx-handler-names */
      <List
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Tasks' /> }}
        size='large'
        dataSource={props.taskList.filter(task => {
          return (props.inProgress ? !task.completed : task.completed) && task.name.match(searchValueState)
        })}
        renderItem={task => (
          <TodoListItem
            task={task}
            onStatusChange={props.onStatusChange}
            onDelete={props.onDelete}
            onSave={props.onSave}
          />
        )}
      />
    )
  }

  const CardCount: React.FC<CountProps> = (props: CountProps) => {
    return (
      <span>{props.taskList.reduce((acc, cur) => {
        if (props.inProgress &&
          !cur.completed &&
          cur.name.match(searchValueState) !== null) return ++acc
        if (!props.inProgress &&
          cur.completed &&
          cur.name.match(searchValueState) !== null) return ++acc
        return acc
      }, 0)} tasks
      </span>
    )
  }

  return (
    <Card
      title={
        <div className='d-flex justify-space-between'>
          <Button
            size='large'
            onClick={() => { setShow(!show) }}
          >
            {show ? <DownOutlined /> : <RightOutlined />}
            {props.cardTitle}
          </Button>
          <Input
            allowClear
            placeholder='Search on the list'
            className='todo-list-input'
            value={searchValueState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValueState(e.target.value)
            }}
          />
        </div>
      }
      // completed list behind todo list
      className={props.inProgress ? 'mt-n4 mt-sm-0' : 'mt-2 mt-sm-6 mt-md-8 mt-lg-10'}
    >
      {
        show
          ? (
            <CardList
              taskList={props.taskList}
              inProgress={props.inProgress}
              onStatusChange={props.onStatusChange}
              onDelete={props.onDelete}
              onSave={props.onSave}
            />
          )
          : (
            <CardCount
              taskList={props.taskList}
              inProgress={props.inProgress}
            />
          )
      }
    </Card>
  )
}

export default TodoList
