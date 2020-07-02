import React, { useEffect, useRef, useState } from 'react'
import { List, Button, Input, Tooltip, Popconfirm } from 'antd'
import { Task } from '../App'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib'

interface Props {
  task: Task
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
  onSave: (task: Task) => void
}

const TodoListItem: React.FC<Props> = (Props) => {
  const [valueState, setValueState] = useState<string>(Props.task.name)
  const inputRef = useRef<Input>(null)

  useEffect(() => {
    setValueState(Props.task.name)
  }, [Props.task.name])

  return (
    <List.Item className='todo-list-item'>
      <div className='d-flex justify-space-between align-center todo-list-item-container'>
        <Button
          shape='circle'
          icon={<CheckOutlined style={{ color: 'white' }} />}
          className={Props.task.completed ? 'todo-list-item-button-complete' : 'todo-list-item-button-todo'}
          onClick={() => { Props.onStatusChange(Props.task.uuid) }}
        />
        <Tooltip placement='topLeft' title='Edit Task' color='purple'>
          <Input
            ref={inputRef}
            defaultValue={Props.task.name}
            value={valueState}
            type='text'
            className={`todo-list-item-input mx-2 ${Props.task.completed ? 'text-decoration-line-through grey--text' : ''}`}
            onPressEnter={() => {
              inputRef.current?.blur()
            }}
            onBlur={() => {
              if (valueState !== Props.task.name) {
                const task: Task = Object.assign({}, Props.task)
                task.name = valueState
                Props.onSave(task)
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValueState(e.target.value)
            }}
          />
        </Tooltip>
        <Popconfirm
          title='Are you sure delete this task?'
          placement='topRight'
          okText='Yes'
          cancelText='No'
          onConfirm={() => { Props.onDelete(Props.task.uuid) }}
        >
          <Button
            type='primary'
            shape='circle'
            icon={<CloseOutlined />}
            danger
          />
        </Popconfirm>
      </div>
    </List.Item>
  )
}

export default TodoListItem
