import { ADD_TASK, DELETE_TASK, TaskActionTypes } from '../types'

export const addTask = (name: string): TaskActionTypes => ({
  type: ADD_TASK,
  payload: { name }
})

export const deleteTask = (uuid: string): TaskActionTypes => ({
  type: DELETE_TASK,
  meta: { uuid }
})
