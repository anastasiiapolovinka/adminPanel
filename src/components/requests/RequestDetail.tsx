import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Form, Input, Modal } from 'antd'
import { requestStore } from '@/stores/RequestStore'
import useModal from '@/hooks/useModal'
import { Space, Wrapper } from '../uikit'
import ApproveRejectForm from './ApproveRejectForm'

interface ValuesProps {
  comment: string
}

const RequestDetail = observer(() => {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const request = requestStore.findRequestById(parseInt(id))

  const handleApprove = () => {
    if (request?.id) {
      requestStore.approveRequest(request.id)
    }
    navigate('/')
  }

  const handleReject = (values: ValuesProps) => {
    if (request?.id) {
      requestStore.rejectRequest(request.id)
      requestStore.addCommentToRequest(request.id, values.comment)
    }
    navigate('/')
  }

  const { showModal, closeModal, modalProps } = useModal()

  return (
    <Wrapper>
      <Card title={`Заявка от ${request?.user}`}>
        <p>Наименование: {request?.materialName}</p>
        <p>Категория: {request?.category}</p>
        <p>Единица измерения: {request?.unit}</p>
        <p>Количество: {request?.quantity}</p>
        <Space size='middle'>
          <Button
            type='primary'
            onClick={handleApprove}
          >
            Одобрить
          </Button>
          <Button
            type='primary'
            onClick={showModal}
          >
            Редактировать
          </Button>
        </Space>
        <Form onFinish={handleReject}>
          <Form.Item
            label='Комментарий'
            name='comment'
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
            >
              Отправить комментарий
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title='Редактирование заявки'
        {...modalProps}
      >
        <ApproveRejectForm closeModal={closeModal} />
      </Modal>
    </Wrapper>
  )
})

export default RequestDetail
