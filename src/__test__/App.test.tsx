import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { handleMatchMedia } from './testUtil'

describe('app test', () => {
  beforeEach(() => {
    handleMatchMedia()
  })
  test('todo list', () => {
    render(<App />)
    screen.getByText('Todo List')
  })
})
