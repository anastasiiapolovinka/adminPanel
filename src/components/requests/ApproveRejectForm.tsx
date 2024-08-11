import useValidateForm from '@/hooks/useValidateForm'
import { catalogStore } from '@/stores/CatalogStore'
import { materialStore } from '@/stores/MaterialStore'
import { requestStore } from '@/stores/RequestStore'
import { unitStore } from '@/stores/UnitStore'
import { createOption } from '@/utils'
import { Button, Form, FormProps, Input } from 'antd'
import { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AutoCompleteField } from '../uikit'
import { observer } from 'mobx-react-lite'

type FieldType = {
  materialName: string
  category: string
  unit: string
  quantity: number
}

interface ApproveRejectFormProps {
  closeModal: () => void
}

const ApproveRejectForm: FC<ApproveRejectFormProps> = observer(
  ({ closeModal = () => {} }) => {
    const { id = '' } = useParams()

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

    const categotyOptions = useMemo(
      () => catalogStore.catalog.map(createOption),
      [catalogStore.catalog]
    )

    const unitOptions = useMemo(
      () => unitStore.units.map(createOption),
      [unitStore.units]
    )

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
)

export default ApproveRejectForm
