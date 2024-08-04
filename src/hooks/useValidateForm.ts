import { Form, FormInstance } from 'antd'
import { useEffect, useState } from 'react'

const useValidateForm = (form: FormInstance) => {
  // Disable submit button in case of validation rules are not passed
  const [isValid, setIsValid] = useState<boolean>(false)

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }, [form, values])

  return isValid
}

export default useValidateForm
