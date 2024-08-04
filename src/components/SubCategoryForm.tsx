import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Select, Tabs } from 'antd'
import { catalogStore } from '../stores/CatalogStore'
import { Category } from '../types'
import { AutoCompleteField, Button, InputField } from './uikit'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { createOption } from '@/utils'

const { Option } = Select

interface SubCategoryFormProps {
  onClose: () => void
}

interface FormValues {
  name: string
  parentId: number | null
}

export const SubCategoryForm: FC<SubCategoryFormProps> = observer(
  ({ onClose }) => {
    const [form] = Form.useForm()

    const [isEditTabActive, setIsEditTabActive] = useState(false)
    const handleTabChange = (activeKey: string) => {
      setIsEditTabActive(Number(activeKey) === 2)
    }

    const handleCategorySelect = (value: string) => {
      const selectedCategory = catalogStore.catalog.find(
        (category) => category.id === Number(value)
      )
      catalogStore.selectCategory(selectedCategory ?? null)
    }

    const handleSubCategorySelect = (value: string) => {
      const selectedSubCategory = catalogStore.selectedCategory?.children.find(
        (category) => category.name === value
      )
      catalogStore.selectSubCategory(selectedSubCategory ?? null)
    }
    // Предотвращаем введение кастомного значения не выбрав предварительно категорию из селекта
    const handleSubCategoryBlur = () => {
      if (!catalogStore.selectedSubCategory) {
        form.setFieldValue('name', '')
      }
    }

    const subCategoryOptions =
      catalogStore.selectedCategory?.children.map(createOption)
    const resetStoreSelectedValues = () => {
      catalogStore.selectCategory(null)
      catalogStore.selectSubCategory(null)
    }
    const onFinish = (values: FormValues) => {
      if (!isEditTabActive) {
        const newCategory: Category = {
          id: Math.random(), // Генерация случайного id
          name: values.name,
          parentId: values.parentId,
          children: [],
        }
        catalogStore.addCategory(newCategory)
      } else {
        catalogStore.updateSubCategory(values.parentId!, {
          ...values,
          id: catalogStore.selectedSubCategory?.id,
        })
      }
      resetStoreSelectedValues()
      onClose()
    }

    const AddForm = () => (
      <Form
        form={form}
        onFinish={onFinish}
      >
        <InputField
          label='Название подкатегории'
          name='name'
          placeholder='Введите название подкатегории'
        />
        <Form.Item
          label='Название категории'
          name='parentId'
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select placeholder='Выберите категорию'>
            {catalogStore.catalog.map((category) => (
              <Option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
          label='Название подкатегории'
          name='name'
          placeholder='Выберите подкатегорию'
          onSelect={handleSubCategorySelect}
          onBlur={handleSubCategoryBlur}
          options={subCategoryOptions}
        />
        <Form.Item
          label='Название категории'
          name='parentId'
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select
            onSelect={handleCategorySelect}
            placeholder='Выберите категорию'
          >
            {catalogStore.catalog.map((category) => (
              <Option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
      <>
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
      </>
    )
  }
)
