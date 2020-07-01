export function setStorage (value: any, key = 'taskList'): void{
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage (key = 'taskList'): any|[] {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]))
  }
  return JSON.parse(localStorage.getItem(key) as string)
}
