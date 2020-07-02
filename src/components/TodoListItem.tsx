import React, { useEffect, useRef, useState } from 'react'
import { List, Button, Input, Tooltip, Popconfirm, DatePicker } from 'antd'
import { Task } from '../App'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib'
import moment from 'moment'

const { RangePicker } = DatePicker

interface Props {
  task: Task
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
  onSave: (task: Task) => void
}

const TodoListItem: React.FC<Props> = (Props) => {
  const [valueState, setValueState] = useState<string>('')
  const [showDateState, setShowDateState] = useState<boolean>(false)
  const [dateFocusState, setDateFocusState] = useState<boolean>(false)
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
          onClick={() => {
            Props.onStatusChange(Props.task.uuid)
          }}
        />
        <Tooltip placement='topLeft' title='Edit Task' color='purple'>
          <div
            style={{ width: '100%' }}
            className='mx-2'
            onFocus={() => {
              // when div is focus, show date picker
              setShowDateState(true)
            }}
            onBlur={() => {
              // wait 100ms to check if user click date picker
              setTimeout(() => {
                // if date is focus, dont hide date picker
                if (!dateFocusState) {
                  setShowDateState(false)
                }
              }, 100)
            }}
          >
            <Input
              ref={inputRef}
              defaultValue={Props.task.name}
              value={valueState}
              type='text'
              className={`todo-list-item-input ${Props.task.completed ? 'text-decoration-line-through grey--text' : ''}`}
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
            {(showDateState || Props.task.expiredDate !== undefined) &&
              <RangePicker
                inputReadOnly
                size='small'
                bordered={false}
                // if there isn't expired date, moment.js will set it to now
                defaultValue={[moment(Props.task.createDate), moment(Props.task.expiredDate)]}
                // sm and down con not hold the date picker
                className='hidden-sm-and-down ml-1'
                // status: if panel is open
                onOpenChange={(status) => {
                  setDateFocusState(status)
                }}
                onChange={(dates, dateStrings) => {
                  const task: Task = Object.assign({}, Props.task)
                  // when click clear, set expired date to undefined but keep create date for sort list
                  if (dates === null) {
                    task.expiredDate = undefined
                    Props.onSave(task)
                    return
                  }
                  task.createDate = new Date(dateStrings[0])
                  task.expiredDate = new Date(dateStrings[1])
                  Props.onSave(task)
                }}
              />}
          </div>
        </Tooltip>
        <Popconfirm
          title='Are you sure delete this task?'
          placement='topRight'
          okText='Yes'
          cancelText='No'
          onConfirm={() => {
            Props.onDelete(Props.task.uuid)
          }}
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
