import { message } from 'antd'
export const info = async (text: string, duration: number = 2000): Promise<void> => {
  await message.info(text, duration)
}

export const success = async (text: string, duration: number = 2000): Promise<void> => {
  await message.success(text, duration)
}

export const error = async (text: string, duration: number = 2000): Promise<void> => {
  await message.error(text, duration)
}
