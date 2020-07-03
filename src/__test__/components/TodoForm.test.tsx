import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoForm from '../../components/TodoForm'
import { Task } from '../../App'
import { act } from 'react-dom/test-utils'
import { handleMatchMedia } from '../testUtil'

describe('TodoForm test', () => {
  let testTask: Task
  const placeholder: string = 'placeholder'
  const buttonText: string = 'buttonText'
  const handleSubmit = (task: Task): void => {
    testTask = task
  }

  beforeEach(() => {
    handleMatchMedia()
    render(
      <TodoForm
        placeholder={placeholder}
        buttonText={buttonText}
        handleSubmit={handleSubmit}
      />
    )
  })

  test('add task', async () => {
    const input = screen.getByPlaceholderText(placeholder) as HTMLButtonElement
    const taskName = 'new task'
    fireEvent.change(input, { target: { value: taskName } })
    // the first button is clear button in inout, add button is the sec
    const button = screen.getAllByRole('button', { hidden: true })[1] as HTMLButtonElement
    fireEvent.click(button)
    // wait call back
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(testTask.name).toStrictEqual(taskName)
  })

  test('empty task warn', async () => {
    const button = screen.getAllByRole('button', { hidden: true })[1] as HTMLButtonElement
    await act(async () => {
      fireEvent.click(button)
      // wait call back
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    screen.getByText('Task is empty')
  })
})
