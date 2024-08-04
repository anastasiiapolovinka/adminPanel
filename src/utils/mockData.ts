import { Request, Category, Brand, Unit, Material } from '@/types'

export const mockRequests: Request[] = [
  {
    id: 1,
    user: 'User1',
    materialName: 'Песок',
    category: 'Сыпучие материалы',
    unit: 'кг',
    quantity: 100,
    status: 'pending',
    comments: [],
  },
  {
    id: 2,
    user: 'User2',
    materialName: 'Цемент',
    category: 'Сыпучие материалы',
    unit: 'кг',
    quantity: 50,
    status: 'pending',
    comments: [],
  },
  {
    id: 3,
    user: 'User3',
    materialName: 'Кирпич',
    category: 'Строительные материалы',
    unit: 'шт',
    quantity: 500,
    status: 'pending',
    comments: [],
  },
  {
    id: 4,
    user: 'User4',
    materialName: 'Бетон',
    category: 'Строительные материалы',
    unit: 'м³',
    quantity: 20,
    status: 'pending',
    comments: [],
  },
]

export const mockCatalog: Category[] = [
  {
    id: 0,
    name: 'Строительные материалы',
    parentId: null,
    children: [
      {
        id: 1,
        name: 'Сыпучие материалы',
        parentId: 0,
        children: [],
      },
      {
        id: 2,
        name: 'Твердые материалы',
        parentId: 0,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Отделочные материалы',
    parentId: null,
    children: [
      {
        id: 4,
        name: 'Линолеум',
        parentId: 3,
        children: [],
      },
      {
        id: 5,
        name: 'Плинтус',
        parentId: 3,
        children: [],
      },
    ],
  },
  {
    id: 6,
    name: 'Сантехника',
    parentId: null,
    children: [
      {
        id: 7,
        name: 'Смесители',
        parentId: 6,
        children: [],
      },
      {
        id: 8,
        name: 'Отопление',
        parentId: 6,
        children: [],
      },
      {
        id: 9,
        name: 'Трубы',
        parentId: 6,
        children: [],
      },
    ],
  },
  {
    id: 10,
    name: 'Напольные покрытия',
    parentId: null,
    children: [],
  },
]

export const mockBrands: Brand[] = [
  {
    id: 1,
    name: 'Бренд1',
  },
  {
    id: 2,
    name: 'Бренд2',
  },
  {
    id: 3,
    name: 'Бренд3',
  },
  {
    id: 4,
    name: 'Бренд4',
  },
]

export const mockUnits: Unit[] = [
  {
    id: 1,
    name: 'кг',
  },
  {
    id: 2,
    name: 'шт',
  },
  {
    id: 3,
    name: 'м³',
  },
  {
    id: 4,
    name: 'л',
  },
]

export const mockMaterials: Material[] = [
  {
    id: 1,
    name: 'Песок',
    category: 'Сыпучие материалы',
    brand: 'Бренд1',
    article: '12345',
    unit: 'кг',
    quantity: 100,
    height: null,
    width: null,
    length: null,
    volume: null,
  },
  {
    id: 2,
    name: 'Цемент',
    category: 'Сыпучие материалы',
    brand: 'Бренд2',
    article: '67890',
    unit: 'кг',
    quantity: 50,
    height: null,
    width: null,
    length: null,
    volume: null,
  },
  {
    id: 3,
    name: 'Кирпич',
    category: 'Строительные материалы',
    brand: 'Бренд3',
    article: '11121',
    unit: 'шт',
    quantity: 500,
    height: 10,
    width: 5,
    length: 20,
    volume: null,
  },
  {
    id: 4,
    name: 'Бетон',
    category: 'Строительные материалы',
    brand: 'Бренд4',
    article: '31415',
    unit: 'м³',
    quantity: 20,
    height: null,
    width: null,
    length: null,
    volume: 20,
  },
]
