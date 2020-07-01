import React from 'react'
import './App.sass'
import { Row, Col } from 'antd'
import TodoTitle from './components/TodoTitle'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const App: React.FC = () => {
  const componentList: JSX.Element[] = [
    <TodoTitle
      key='title'
      title='Todo List'
    />,
    <TodoInput
      key='input'
      placeholder='Add a task'
      buttonText='Add'
    />,
    <TodoList
      key='list'
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
