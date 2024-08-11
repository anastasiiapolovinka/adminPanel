import useValidateForm from '@/hooks/useValidateForm'
import { brandStore } from '@/stores/BrandStore'
import { catalogStore } from '@/stores/CatalogStore'
import { materialStore } from '@/stores/MaterialStore'
import { unitStore } from '@/stores/UnitStore'
import { Material } from '@/types'
import { createOption } from '@/utils'
import { Button, Form, Space } from 'antd'
import { useMemo, useState } from 'react'
import { AutoCompleteField, InputField, Wrapper } from './uikit'
import { observer } from 'mobx-react-lite'

const AddMaterial = observer(() => {
  const [form] = Form.useForm()

  const materialOptions = useMemo(
    () => materialStore.materials.map(createOption),
    [materialStore.materials]
  )

  const handleMaterialChange = (value: string) => {
    const currentMaterial = materialStore.findMaterialByName(value) || null
    // Автовыбор категории для товара из уже существующего списка
    const materialRelatedCategory = currentMaterial?.category
    if (materialRelatedCategory) {
      form.setFieldValue('category', materialRelatedCategory)
    }
  }

  const categoryOptions = useMemo(
    () => catalogStore.catalog.map(createOption),
    [catalogStore.catalog]
  )

  const handleCategoryChange = (value: string) => {
    const selectedCategory = catalogStore.findCategoryByName(value)
    catalogStore.selectCategory(selectedCategory ?? null)
  }

  // SubCategory
  const handleSubCategoryChange = (value: string) => {
    const selectedCategory = catalogStore.selectedCategory
    const selectedSubCategory = selectedCategory?.children.find(
      (subCategory) => subCategory.name === value
    )
    catalogStore.selectSubCategory(selectedSubCategory ?? null)
  }

  const subCategoryOptions = useMemo(
    () => catalogStore.selectedCategory?.children.map(createOption),
    [catalogStore.selectedCategory?.children]
  )

  const brandOptions = useMemo(
    () => brandStore.brands.map(createOption),
    [brandStore.brands]
  )

  // Units
  const [unit, setUnit] = useState('')
  const handleUnitChange = (value: string) => {
    setUnit(value)
  }

  const unitOptions = useMemo(
    () => unitStore.units.map(createOption),
    [unitStore.units]
  )

  const onFinish = (values: Material) => {
    materialStore.addMaterial({
      id: Math.random(),
      name: values.name,
      category: values.category,
      subCategory: values.subCategory,
      brand: values.brand,
      article: values.article,
      unit: values.unit,
      height: values.height || null,
      width: values.width || null,
      length: values.length || null,
      volume: values.volume || null,
    })

    const newCategoryId = Math.random()
    // Проверим на наличие категории в сторе
    if (!catalogStore.selectedCategory) {
      catalogStore.addCategory({
        id: newCategoryId,
        name: values.category,
        parentId: null,
        children: [],
      })
    }
    // Проверим на наличие подкатегории в сторе
    if (!catalogStore.selectedSubCategory) {
      catalogStore.addCategory({
        id: Math.random(),
        name: values.subCategory,
        parentId: newCategoryId,
        children: [],
      })
    }
    // Проверим на наличие бренда в сторе
    const selectedBrand = brandStore.brands.find(
      (brand) => brand.name === values.brand
    )
    if (!selectedBrand) {
      brandStore.addBrand({
        id: Math.random(),
        name: values.brand,
      })
    }
    form.resetFields()
  }

  // Disable submit button in case of validation rules are not passed
  const submittable = useValidateForm(form)

  return (
    <Wrapper>
      <Form
        form={form}
        name='update-submission'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <AutoCompleteField
          label='Наименование'
          name='name'
          placeholder='Добавьте наименование'
          onChange={handleMaterialChange}
          options={materialOptions}
        />
        <AutoCompleteField
          label='Категория'
          name='category'
          placeholder='Добавьте категорию'
          onChange={handleCategoryChange}
          options={categoryOptions}
        />
        <AutoCompleteField
          label='Подкатегория'
          name='subCategory'
          placeholder='Добавьте подкатегорию'
          onChange={handleSubCategoryChange}
          options={subCategoryOptions}
        />
        <AutoCompleteField
          label='Бренд'
          name='brand'
          placeholder='Добавьте бренд'
          options={brandOptions}
        />
        <AutoCompleteField
          label='Единица измерения'
          name='unit'
          onChange={handleUnitChange}
          placeholder='Добавьте единицу измерения'
          options={unitOptions}
        />
        <InputField
          label='Артикул'
          name='article'
          placeholder='Добавьте артикул'
        />
        {unit === 'шт' && (
          <>
            <InputField
              label='Высота'
              name='height'
              placeholder='Добавьте высота'
            />
            <InputField
              label='Ширина'
              name='width'
              placeholder='Добавьте ширина'
            />
            <InputField
              label='Длина'
              name='length'
              placeholder='Добавьте длина'
            />
            <InputField
              label='Объём'
              name='volume'
              placeholder='Добавьте объём'
            />
          </>
        )}
        <Form.Item>
          <Space>
            <Button
              type='primary'
              htmlType='submit'
              disabled={!submittable}
            >
              Сохранить
            </Button>
            <Button htmlType='reset'>Сбросить</Button>
          </Space>
        </Form.Item>
      </Form>
    </Wrapper>
  )
})

export default AddMaterial
