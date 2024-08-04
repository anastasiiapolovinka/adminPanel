import useValidateForm from '@/hooks/useValidateForm'
import { catalogStore } from '@/stores/CatalogStore'
import { materialStore } from '@/stores/MaterialStore'
import { requestStore } from '@/stores/RequestStore'
import { unitStore } from '@/stores/UnitStore'
import { createOption } from '@/utils'
import { Button, Form, FormProps, Input } from 'antd'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { AutoCompleteField } from '../uikit'

type FieldType = {
  materialName: string
  category: string
  unit: string
  quantity: number
}

interface ApproveRejectFormProps {
  closeModal: () => void
}

const ApproveRejectForm: FC<ApproveRejectFormProps> = ({
  closeModal = () => {},
}) => {
  const { id = '' } = useParams()

  const [form] = Form.useForm()

  const materialOptions = materialStore.materials.map(createOption)

  const handleMaterialChange = (value: string) => {
    const currentMaterial = materialStore.findMaterialByName(value) || null
    // Автовыбор категории для товара из уже существующего списка
    const materialRelatedCategory = currentMaterial?.category
    if (materialRelatedCategory) {
      form.setFieldValue('category', materialRelatedCategory)
    }
  }

  const categotyOptions = catalogStore.catalog.map(createOption)

  const unitOptions = unitStore.units.map(createOption)

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    closeModal()
    requestStore.updateRequest(parseInt(id), values)
  }

  const submittable = useValidateForm(form)

  return (
    <Form
      form={form}
      name='update-submission'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <AutoCompleteField
        label='Наименование'
        name='materialName'
        placeholder='Выберите наименование'
        onChange={handleMaterialChange}
        options={materialOptions}
      />
      <AutoCompleteField
        label='Категория'
        name='category'
        placeholder='Выберите категорию'
        options={categotyOptions}
      />
      <AutoCompleteField
        label='Единица измерения'
        name='unit'
        placeholder='Выберите единицу измерения'
        options={unitOptions}
      />
      <Form.Item<FieldType>
        label='Количество'
        name='quantity'
        rules={[{ required: true }]}
      >
        <Input placeholder='Введите колличество единиц' />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!submittable}
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ApproveRejectForm
