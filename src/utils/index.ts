import { Option } from '../types'

type Item = {
  name: string
}

export const createOption = (item: Item): Option => ({
  value: item.name,
  label: item.name,
})
