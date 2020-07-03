// https://testing-library.com/docs/dom-testing-library/api-queries

import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import TodoListItem from '../../components/TodoListItem'
import { Task } from '../../App'
import { act } from 'react-dom/test-utils'

describe('ToListItem test', () => {
  let task: Task
  let rerender: () => void
  const onStatusChange = (uuid: string): void => {
    task.completed = !task.completed
  }
  const onDelete = (uuid: string): void => {
    // @ts-ignore
    task = {}
  }
  const onSave = (t: Task): void => {
    task = t
  }

  beforeEach(async () => {
    task = {
      uuid: 'uuid',
      name: 'taskName',
      completed: false,
      createDate: new Date()
    }
    const { rerender: renderFunction } = render(
      <TodoListItem
        task={task}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onSave={onSave}
      />
    )
    rerender = () => {
      renderFunction(
        <TodoListItem
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onSave={onSave}
        />
      )
    }
  })

  test('task name test', () => {
    expect(screen.getByDisplayValue(task.name)).toHaveValue(task.name)
    const oldName = task.name
    const name = 'changed name'
    task.name = name
    rerender()
    expect(screen.getByDisplayValue(name)).toHaveValue(name)
    expect(screen.queryByDisplayValue(oldName)).toBe(null)
  })

  describe('date picker show test', () => {
    test('default, date is null', () => {
      expect(screen.queryByTestId('test-date')).toBe(null)
    })

    test('when expired has a value, date always show', () => {
      task.expiredDate = new Date()
      rerender()
      screen.getByTestId('test-date')
    })

    test('div focus, show date', () => {
      expect(screen.queryByTestId('test-date')).toBe(null)
      fireEvent.focus(screen.getByTestId('test-div'))
      screen.getByTestId('test-date')
    })

    test('input focus, show date', () => {
      expect(screen.queryByTestId('test-date')).toBe(null)
      fireEvent.focus(screen.getByDisplayValue(task.name))
      screen.getByTestId('test-date')
    })

    test('div blur, date is null', async () => {
      fireEvent.focus(screen.getByTestId('test-div'))
      // only this will change state async, need to use act to avoid warning
      await act(async () => {
        fireEvent.blur(screen.getByTestId('test-div'))
        await new Promise(resolve => setTimeout(resolve, 200))
      })
      expect(screen.queryByTestId('test-date')).toBe(null)
    })

    test('div blur when date is focus, show date', async () => {
      fireEvent.focus(screen.getByTestId('test-div'))
      fireEvent.click(screen.getByTestId('test-date'))
      fireEvent.blur(screen.getByTestId('test-div'))
      await new Promise(resolve => setTimeout(resolve, 200))
      // getBy will throw error if it is not exist
      screen.getByTestId('test-date')
    })
  })

  test('on status change test', () => {
    // test in parent
  })

  test('on delete test', () => {
    // test in parent
  })

  test('on save test', () => {
    const oldName = task.name
    task.name = 'changed name'
    // blur will call save function
    fireEvent.blur(screen.getByDisplayValue(oldName))
    rerender()
    expect(screen.getByDisplayValue(task.name)).toHaveValue(task.name)
  })
})
