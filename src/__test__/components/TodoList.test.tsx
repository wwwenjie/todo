import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TodoList from '../../components/TodoList'
import { Task } from '../../App'
import { handleMatchMedia } from '../testUtil'

describe('ToList test', () => {
  handleMatchMedia()
  let taskList: Task[]
  let inProgress: boolean
  let rerender: () => void
  const cardTitle: string = 'title'
  const onStatusChange = (uuid: string): void => {
    taskList.map(task => {
      if (task.uuid === uuid) {
        task.completed = !task.completed
      }
      return task
    })
  }
  const onDelete = (uuid: string): void => {
    taskList.filter(task => {
      return task.uuid !== uuid
    })
  }
  const onSave = (task: Task): void => {
    taskList.map(taskMap => {
      return taskMap.uuid === task.uuid ? task : taskMap
    })
  }

  beforeEach(() => {
    taskList = [{
      uuid: '1',
      name: 'name1',
      completed: false,
      createDate: new Date()
    }, {
      uuid: '2',
      name: 'name2',
      completed: true,
      createDate: new Date()
    }]
    inProgress = true
    const { rerender: renderFunction } = render(
      <TodoList
        taskList={taskList}
        cardTitle={cardTitle}
        inProgress={inProgress}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onSave={onSave}
      />
    )
    rerender = () => {
      renderFunction(
        <TodoList
          taskList={taskList}
          cardTitle={cardTitle}
          inProgress={inProgress}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onSave={onSave}
        />
      )
    }
  })

  test('card title test', () => {
    screen.getByText(cardTitle)
  })

  test('task filter test', () => {
    const filter: string = taskList.filter(task => {
      return inProgress ? !task.completed : task.completed
    })[0].name
    // test-div is a div id of list item
    const input = screen.queryByTestId('test-div')?.firstChild as HTMLInputElement
    expect(input.value).toStrictEqual(filter)
    inProgress = false
    rerender()
    expect(input.value).toStrictEqual(filter)
  })

  test('on status change test', () => {
    const button = screen.getByTestId('test-status-button')
    fireEvent.click(button)
    rerender()
    expect(screen.queryByTestId('test-status-button')).toBe(null)
  })

  test('on delete test', () => {
    // too complex to click antd pop components
  })

  test('on save test', () => {
    // test in children
  })
})
