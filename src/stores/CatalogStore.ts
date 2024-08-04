import { makeAutoObservable } from 'mobx'
import { Category } from '../types'

class CatalogStore {
  catalog: Category[] = []
  selectedCategory: Category | null = null
  selectedSubCategory: Category | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setCatalog(catalog: Category[]) {
    this.catalog = catalog
  }

  selectCategory(category: Category | null) {
    this.selectedCategory = category
  }

  selectSubCategory(subCategory: Category | null) {
    this.selectedSubCategory = subCategory
  }

  addCategory(category: Category) {
    if (category.parentId === null) {
      this.catalog.push(category)
    } else {
      const parentCategory = this.findCategoryById(
        this.catalog,
        category.parentId
      )
      if (parentCategory) {
        parentCategory.children.push(category)
      }
    }
  }

  updateCategory(categoryId: number, updatedCategory: Partial<Category>) {
    const category = this.catalog.find((cat) => cat.id === categoryId)
    if (category) {
      Object.assign(category, updatedCategory)
    }
  }

  updateSubCategory(categoryId: number, updatedCategory: Partial<Category>) {
    const category = this.catalog.find((cat) => cat.id === categoryId)
    const subCategory = category?.children.find(
      (subCat) => subCat.id === updatedCategory.id
    )
    if (subCategory) {
      Object.assign(subCategory, updatedCategory)
    }
  }

  moveSubCategory(categoryId: number, newParentId: number) {
    const category = this.findCategoryById(this.catalog, categoryId)
    if (!category) return

    // Удаляем подкатегорию из текущего родителя
    const parentCategory = this.findCategoryById(
      this.catalog,
      category.parentId!
    )
    if (parentCategory) {
      parentCategory.children = parentCategory.children.filter(
        (child) => child.id !== categoryId
      )
    }

    // Обновляем parentId у подкатегории
    category.parentId = newParentId

    // Добавляем подкатегорию в нового родителя
    const newParentCategory = this.findCategoryById(this.catalog, newParentId)
    if (newParentCategory) {
      newParentCategory.children.push(category)
    }
  }

  findCategoryById(categories: Category[], id: number): Category | null {
    for (const category of categories) {
      if (category.id === id) {
        return category
      }
      const found = this.findCategoryById(category.children, id)
      if (found) {
        return found
      }
    }
    return null
  }

  findCategoryByName(name: string) {
    return this.catalog.find((category) => category.name === name)
  }
}

export const catalogStore = new CatalogStore()
