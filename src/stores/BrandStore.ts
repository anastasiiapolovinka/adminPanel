import { makeAutoObservable } from 'mobx'
import { Brand } from '../types'

class BrandStore {
  brands: Brand[] = []
  selectedBrand: Brand | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setBrands(brands: Brand[]) {
    this.brands = brands
  }

  selectBrand(brand: Brand) {
    this.selectedBrand = brand
  }

  addBrand(brand: Brand) {
    this.brands.push(brand)
  }
}

export const brandStore = new BrandStore()
