import React, { useEffect, useRef, useState } from 'react'
import { List, Button, Input, Tooltip } from 'antd'
import { Task } from '../App'
import { CheckOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons/lib'

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
          key='status'
          type='ghost'
          shape='circle'
          icon={Props.task.completed ? <CheckOutlined /> : <ClockCircleOutlined />}
          onClick={() => { Props.onStatusChange(Props.task.uuid) }}
        />
        <Tooltip placement='topLeft' title='Edit Task' color='purple'>
          <Input
            ref={inputRef}
            defaultValue={Props.task.name}
            value={valueState}
            type='text'
            className='todo-list-item-input mx-2'
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
        <Button
          key='delete'
          type='primary'
          shape='circle'
          icon={<CloseOutlined />}
          danger
          onClick={() => { Props.onDelete(Props.task.uuid) }}
        />
      </div>
    </List.Item>
  )
}

export default TodoListItem
