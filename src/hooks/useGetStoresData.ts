import { brandStore } from '@/stores/BrandStore'
import { catalogStore } from '@/stores/CatalogStore'
import { materialStore } from '@/stores/MaterialStore'
import { requestStore } from '@/stores/RequestStore'
import { unitStore } from '@/stores/UnitStore'
import { mockedFetch } from '@/utils/mockedFetch'
import { useEffect } from 'react'

const useGetStoresData = () => {
  useEffect(() => {
    const fetchData = async () => {
      const requests = await mockedFetch('api/requests')
      requestStore.setRequests(requests)
      const materials = await mockedFetch('api/materials')
      materialStore.setMaterials(materials)
      const catalog = await mockedFetch('api/catalog')
      catalogStore.setCatalog(catalog)
      const units = await mockedFetch('api/units')
      unitStore.setUnits(units)
      const brands = await mockedFetch('api/brands')
      brandStore.setBrands(brands)
    }
    fetchData()
  }, [])
}

export default useGetStoresData
