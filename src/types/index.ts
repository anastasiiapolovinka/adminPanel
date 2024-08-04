export type Option = {
  value: string
  label: string
}

export type Status = 'pending' | 'approved' | 'rejected'

export interface Request {
  id: number
  user: string
  materialName: string
  category: string
  unit: string
  quantity: number
  status: Status
  comments: Comment[]
}

export interface Material {
  id: number
  name: string
  category: string
  subCategory: string
  brand: string
  article: string
  unit: string
  height?: number | null
  width?: number | null
  length?: number | null
  volume?: number | null
}

export interface Category {
  id: number
  name: string
  parentId: number | null
  children: Category[]
}

export interface Brand {
  id: number
  name: string
}

export interface Unit {
  id: number
  name: string
}

export interface Comment {
  id: number
  text: string
}
