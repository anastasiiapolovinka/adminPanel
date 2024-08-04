import { Form, Input } from 'antd'
import { FC } from 'react'

interface Props {
  label: string
  name: string
  placeholder: string
}

const InputField: FC<Props> = ({ label = '', name = '', placeholder = '' }) => (
  <Form.Item
    label={label}
    name={name}
  >
    <Input placeholder={placeholder} />
  </Form.Item>
)

export default InputField
