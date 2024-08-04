import { makeAutoObservable } from 'mobx'
import { Unit } from '../types'

class UnitStore {
  units: Unit[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setUnits(units: Unit[]) {
    this.units = units
  }
}

export const unitStore = new UnitStore()
