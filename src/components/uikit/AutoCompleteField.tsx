import { Option } from '@/types'
import { AutoComplete, Form } from 'antd'
import { FC } from 'react'

interface Props {
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  onBlur?: () => void
  options?: Option[]
  label: string
  name: string
  placeholder: string
}

const AutoCompleteField: FC<Props> = ({
  onChange = () => {},
  onSelect = () => {},
  onBlur = () => {},
  options = [],
  label = '',
  name = '',
  placeholder = '',
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={[{ required: true, message: 'Поле не может быть пустым' }]}
  >
    <AutoComplete
      allowClear
      placeholder={placeholder}
      onChange={onChange}
      onSelect={onSelect}
      onBlur={onBlur}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  </Form.Item>
)

export default AutoCompleteField
