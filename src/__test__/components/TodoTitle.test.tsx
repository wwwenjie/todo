// detail: https://testing-library.com/docs/react-testing-library/example-intro

import React from 'react'
import { render } from '@testing-library/react'
import TodoTitle from '../../components/TodoTitle'

describe('ToListItem test', () => {
  test('renders titles', () => {
    const { getByText } = render(<TodoTitle title='title' subTitle='sub' />)
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('sub')).toBeInTheDocument()
  })
})
