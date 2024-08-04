import { observer } from 'mobx-react-lite'
import { requestStore } from '../../stores/RequestStore'
import { Button, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { Request } from '@/types'
import { toJS } from 'mobx'
import { Title, Wrapper } from '../uikit'

type Status = 'pending' | 'rejected' | 'approved'

const STATUS_COLOR_MAP: Record<Status, string> = {
  pending: 'orange',
  rejected: 'red',
  approved: 'green',
}

const StatusColumn = (status: Status) => (
  <Tag
    color={STATUS_COLOR_MAP[status]}
    key={status}
  >
    {status.toUpperCase()}
  </Tag>
)

const ActionColumn = (record: Request) => (
  <span>
    <Link to={`/request/${record.id}`}>
      <Button>Детали</Button>
    </Link>
  </span>
)

const RequestList = observer(() => {
  const columns = [
    { title: 'Пользователь', dataIndex: 'user', key: 'user' },
    { title: 'Материал', dataIndex: 'materialName', key: 'materialName' },
    { title: 'Категория', dataIndex: 'category', key: 'category' },
    { title: 'Единица измерения', dataIndex: 'unit', key: 'unit' },
    { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      render: StatusColumn,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: ActionColumn,
    },
  ]

  return (
    <Wrapper large>
      <Title>Заявки</Title>
      <Table
        dataSource={toJS(requestStore.requests)}
        columns={columns}
        rowKey='id'
      />
    </Wrapper>
  )
})

export default RequestList
