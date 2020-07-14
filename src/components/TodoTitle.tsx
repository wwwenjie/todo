import React from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'

interface Props {
  title: string
  subTitle?: string
}

const TodoTitle: React.FC<Props> = (props: Props) => {
  return (
    <div className='mt-6 mt-sm-12 white--text'>
      <UnorderedListOutlined className='text-h4' />
      <span className='ml-4 text-h4'>{props.title}</span>
      <span className='text-h5'> {props.subTitle}</span>
    </div>
  )
}

export default TodoTitle
