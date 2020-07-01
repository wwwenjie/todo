import React, { useState } from 'react'
import './App.sass'
import { Row, Col } from 'antd'
import TodoTitle from './components/TodoTitle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export interface Task {
  name: string
  completed: boolean
  createDate: Date
  expiredDate?: Date
}

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([
    {
      name: 'new task',
      completed: false,
      createDate: new Date(),
      expiredDate: new Date()
    }
  ])

  const handleSubmit = (task: Task): void => {
    setTaskList(taskList.concat([task]))
  }

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
    <TodoList
      key='list'
      taskList={taskList}
    />
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
