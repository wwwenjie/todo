import React, { useEffect, useState } from 'react'
import './App.sass'
import { Row, Col } from 'antd'
import TodoTitle from './components/TodoTitle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { getStorage, setStorage } from './utils/storage'

export interface Task {
  uuid: string
  name: string
  completed: boolean
  createDate: Date
  expiredDate?: Date
}

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(getStorage())

  useEffect(() => {
    setStorage(taskList)
  })

  const handleSubmit = (task: Task): void => {
    setTaskList(taskList.concat([task]))
  }

  const handleStatusChange = (uuid: string): void => {
    setTaskList(taskList.map(task => {
      if (task.uuid === uuid) {
        task.completed = !task.completed
      }
      return task
    }))
  }

  const handleDelete = (uuid: string): void => {
    setTaskList(taskList.filter(task => {
      return task.uuid !== uuid
    }))
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
      key: 'CompletedList',
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
      key='input'
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
