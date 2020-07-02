import React, { useEffect, useState } from 'react'
import './App.sass'
import { Row, Col } from 'antd'
import TodoTitle from './components/TodoTitle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { getTaskListStorage, setTaskListStorage } from './utils/storage'
import { message } from 'antd/es'

export interface Task {
  uuid: string
  name: string
  completed: boolean
  createDate: Date
  expiredDate?: Date
}

const App: React.FC = () => {
  // todo: avoid repeated get
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    setTaskList(getTaskListStorage())
  }, [])

  useEffect(() => {
    setTaskListStorage(taskList)
  }, [taskList])

  const handleSubmit = async (task: Task): Promise<void> => {
    setTaskList([task].concat(taskList))
    await message.success('Task added')
  }

  const handleStatusChange = async (uuid: string): Promise<void> => {
    let flag: boolean|undefined
    setTaskList(taskList.map(task => {
      if (task.uuid === uuid) {
        task.completed = !task.completed
        flag = task.completed
      }
      return task
    }))
    if (flag !== undefined) {
      await message.success(flag ? 'Task complete!' : 'Task move to todo')
    } else {
      await message.error(`Error: didn't find uuid ${uuid} in task list`)
      console.error(uuid)
    }
  }

  const handleDelete = async (uuid: string): Promise<void> => {
    setTaskList(taskList.filter(task => {
      return task.uuid !== uuid
    }))
    await message.warn('Task deleted')
  }

  const handleSave = async (task: Task): Promise<void> => {
    setTaskList(taskList.map(taskMap => {
      return taskMap.uuid === task.uuid ? task : taskMap
    }))
    await message.success('Task updated')
  }

  const todoListComponents: Array<{
    key: string
    cardTitle: string
    inProgress: boolean
  }> = [
    {
      key: 'todoList',
      cardTitle: 'Todo',
      inProgress: true
    }, {
      key: 'completedList',
      cardTitle: 'Completed',
      inProgress: false
    }
  ]

  const componentList: JSX.Element[] = [
    <TodoTitle
      key='title'
      title='Todo List'
    />,
    <TodoForm
      key='form'
      placeholder='Add a task'
      buttonText='Add'
      handleSubmit={handleSubmit}
    />,
    ...todoListComponents.map(list => {
      return (
        <TodoList
          key={list.key}
          taskList={taskList}
          cardTitle={list.cardTitle}
          inProgress={list.inProgress}
          handleStatusChange={handleStatusChange}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      )
    })
  ]

  return (
    // v-application: enable css utils in vuetify
    <Row
      className='v-application'
      justify='center'
      align='top'
      gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]}
    >
      {componentList.map((component, index) => {
        return (
          <Col
            key={index}
            xs={22}
            sm={20}
            md={18}
            lg={16}
          >
            {component}
          </Col>
        )
      })}
    </Row>
  )
}

export default App
