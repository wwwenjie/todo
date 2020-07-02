import { Task } from '../App'

export function setTaskListStorage (value: any, key = 'taskList'): void{
  localStorage.setItem(key, JSON.stringify(value))
}

export function getTaskListStorage (key = 'taskList'): Task[]|[] {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]))
  }
  const array: Task[] = JSON.parse(localStorage.getItem(key) as string)
  array.sort((a, b) => {
    return a.createDate <= b.createDate ? 1 : -1
  })
  return array
}
