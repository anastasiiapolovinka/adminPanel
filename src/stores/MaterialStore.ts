import { Material } from '@/types'
import { makeAutoObservable } from 'mobx'

class MaterialStore {
  materials: Material[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setMaterials(materials: Material[]) {
    this.materials = materials
  }

  addMaterial(material: Material) {
    this.materials = [...this.materials, material]
  }

  findMaterialByName(name: string) {
    return this.materials.find((material) => material.name === name)
  }
}

export const materialStore = new MaterialStore()
