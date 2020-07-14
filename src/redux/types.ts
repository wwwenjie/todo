export interface Task {
  uuid: string
  name: string
  completed: boolean
  createDate: Date
  expiredDate?: Date
}

export interface TaskState {
  tasks: Task[]
}

export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'

interface AddTask {
  type: typeof ADD_TASK
  payload: {
    name: string
  }
}

interface DeleteTask {
  type: typeof DELETE_TASK
  meta: {
    uuid: string
  }
}

export type TaskActionTypes = AddTask | DeleteTask
