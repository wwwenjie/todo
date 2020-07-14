import { ADD_TASK, DELETE_TASK, TaskActionTypes, TaskState } from '../types'

const initialState: TaskState = {
  tasks: []
}

const tasks = (action: TaskActionTypes, state: TaskState = initialState): TaskState => {
  switch (action?.type) {
    case ADD_TASK:
      return {
        tasks: [
          ...state.tasks,
          {
            uuid: 'uuid',
            name: action.payload.name,
            completed: true,
            createDate: new Date()
          }
        ]
      }
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter(task =>
          task.uuid !== action.meta.uuid
        )
      }
    default:
      return state
  }
}

export default tasks
