import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Tabs } from 'antd'
import { catalogStore } from '../stores/CatalogStore'
import { Category } from '../types'
import { AutoCompleteField, Button, InputField } from './uikit'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { createOption } from '@/utils'

interface CategoryFormProps {
  onClose: () => void
}

interface FormValues {
  name: string
}

export const CategoryForm: FC<CategoryFormProps> = observer(({ onClose }) => {
  const [form] = Form.useForm()
  const [isEditTabActive, setIsEditTabActive] = useState(false)
  const handleTabChange = (activeKey: string) =>
    setIsEditTabActive(Number(activeKey) === 2)

  const handleCategorySelect = (value: string) => {
    const selectedCategory = catalogStore.catalog.find(
      (category) => category.name === value
    )
    catalogStore.selectCategory(selectedCategory ?? null)
  }
  // Предотвращаем введение кастомного значения не выбрав предварительно категорию из селекта
  const handleCategoryBlur = () => {
    if (!catalogStore.selectedCategory) {
      form.setFieldValue('name', '')
    }
  }
  const categoryOptions = catalogStore.catalog.map(createOption)

  const onFinish = (values: FormValues) => {
    if (!isEditTabActive) {
      const newCategory: Category = {
        id: Math.random(), // Генерация случайного id
        name: values.name,
        parentId: null,
        children: [],
      }
      catalogStore.addCategory(newCategory)
    } else {
      const categoryId = catalogStore.selectedCategory?.id
      catalogStore.updateCategory(categoryId!, values)
    }
    onClose()
  }

  const AddForm = () => (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <InputField
        label='Название категории'
        name='name'
        placeholder='Добавьте категорию'
      />
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )

  const EditForm = () => (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <AutoCompleteField
        label='Категория'
        name='name'
        placeholder='Выберите категорию для редактирования'
        onSelect={handleCategorySelect}
        onBlur={handleCategoryBlur}
        options={categoryOptions}
      />
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Tabs
      defaultActiveKey='1'
      onChange={handleTabChange}
      centered
      items={[PlusOutlined, EditOutlined].map((Icon, i) => {
        const id = String(i + 1)
        return {
          key: id,
          label: i === 0 ? 'Добавить' : 'Редактировать',
          children: i === 0 ? <AddForm /> : <EditForm />,
          icon: <Icon />,
        }
      })}
    />
  )
})
