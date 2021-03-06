import React, { useEffect, useRef, useState } from 'react'
import { List, Button, Input, Tooltip, Popconfirm, DatePicker } from 'antd'
import { Task } from '../App'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group'

const { RangePicker } = DatePicker

interface Props {
  task: Task
  onStatusChange: (uuid: string) => void
  onDelete: (uuid: string) => void
  onSave: (task: Task) => void
}

const TodoListItem: React.FC<Props> = (props: Props) => {
  const [valueState, setValueState] = useState<string>('')
  const [showDateState, setShowDateState] = useState<boolean>(false)
  const [dateFocusState, setDateFocusState] = useState<boolean>(false)
  const inputRef = useRef<Input>(null)

  useEffect(() => {
    setValueState(props.task.name)
  }, [props.task.name])

  return (
    <List.Item className='todo-list-item'>
      <div className='d-flex justify-space-between todo-list-item-container'>
        <Button
          data-testid='test-status-button'
          shape='circle'
          icon={<CheckOutlined style={{ color: 'white' }} />}
          className={`todo-list-item-button-${props.task.completed ? 'complete' : 'todo'} ${(showDateState || props.task.expiredDate !== undefined) ? 'line' : ''}`}
          onClick={() => {
            props.onStatusChange(props.task.uuid)
          }}
        />
        <Tooltip placement='topLeft' title='Edit Task' color='purple'>
          <div
            data-testid='test-div'
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
              defaultValue={props.task.name}
              value={valueState}
              type='text'
              className={`todo-list-item-input ${props.task.completed ? 'text-decoration-line-through grey--text' : ''}`}
              onPressEnter={() => {
                inputRef.current?.blur()
              }}
              onBlur={() => {
                if (valueState !== props.task.name) {
                  const task: Task = Object.assign({}, props.task)
                  task.name = valueState
                  props.onSave(task)
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValueState(e.target.value)
              }}
            />
            <CSSTransition
              in={showDateState || props.task.expiredDate !== undefined}
              unmountOnExit
              timeout={200}
              classNames='alert'
            >
              <RangePicker
                data-testid='test-date'
                inputReadOnly
                size='small'
                bordered={false}
                // if there isn't expired date, moment.js will set it to now
                defaultValue={[moment(props.task.createDate), moment(props.task.expiredDate)]}
                // sm and down con not hold the date picker
                className='hidden-sm-and-down ml-1'
                // status: if panel is open
                onOpenChange={(status) => {
                  setDateFocusState(status)
                }}
                onChange={(dates, dateStrings) => {
                  const task: Task = Object.assign({}, props.task)
                  // when click clear, set expired date to undefined but keep create date for sort list
                  if (dates === null) {
                    task.expiredDate = undefined
                    props.onSave(task)
                    return
                  }
                  // task.createDate: 2020-07-10T21:10:55.000Z
                  // dateStrings[0]: 2020-07-10
                  // avoid messing up the order when createDate is not modified
                  if (task.createDate.toString().substring(0, 10) !== dateStrings[0]) {
                    task.createDate = new Date(dateStrings[0])
                  }
                  task.expiredDate = new Date(dateStrings[1])
                  props.onSave(task)
                }}
              />
            </CSSTransition>
          </div>
        </Tooltip>
        <Popconfirm
          title='Are you sure delete this task?'
          placement='topRight'
          okText='Yes'
          cancelText='No'
          onConfirm={() => {
            props.onDelete(props.task.uuid)
          }}
        >
          <Button
            type='primary'
            shape='circle'
            icon={<CloseOutlined />}
            danger
            className={`${(showDateState || props.task.expiredDate !== undefined) ? 'line' : ''}`}
          />
        </Popconfirm>
      </div>
    </List.Item>
  )
}

export default TodoListItem
