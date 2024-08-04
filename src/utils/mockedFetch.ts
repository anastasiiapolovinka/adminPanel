// const DATA_TYPE: Record<string, string> = {
//     requests:
//     materialStore.setMaterials(mockMaterials)
//     catalogStore.setCatalog(mockCatalog)
//     unitStore.setUnits(mockUnits)
//     brandStore.setBrands(mockBrands)
// }

import { Brand, Category, Material, Request, Unit } from '@/types'
import {
  mockBrands,
  mockCatalog,
  mockMaterials,
  mockRequests,
  mockUnits,
} from './mockData'

export const mockedFetch = (
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> =>
  new Promise((resolve) => {
    let response: Array<Request | Material | Category | Unit | Brand> = []
    switch (true) {
      case url.endsWith('requests'):
        response = mockRequests
        break
      case url.endsWith('materials'):
        response = mockMaterials
        break
      case url.endsWith('catalog'):
        response = mockCatalog
        break
      case url.endsWith('units'):
        response = mockUnits
        break
      case url.endsWith('brands'):
        response = mockBrands
        break
      default:
        break
    }
    resolve(response)
  })
