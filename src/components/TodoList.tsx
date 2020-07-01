import React from 'react'
import { List, Card } from 'antd'
import TodoListItem from './TodoListItem'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]

interface Props {
  cardTitle?: string
}

const TodoList: React.FC<Props> = (Props) => {
  return (
    <div>
      <Card
        title='Todo'
      >
        <List
          size='large'
          dataSource={data}
          renderItem={() => (
            <TodoListItem />
          )}
        />
      </Card>
      <Card
        title='Completed'
        className='mt-2 mt-sm-6 mt-md-8 mt-lg-10'
      >
        <List
          size='large'
          dataSource={data}
          renderItem={() => (
            <TodoListItem />
          )}
        />
      </Card>
    </div>
  )
}

export default TodoList
