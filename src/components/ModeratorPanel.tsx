import useGetCurrentActiveMenuKey from '@/hooks/useGetCurrentActiveMenuKey'
import useGetStoresData from '@/hooks/useGetStoresData'
import { Layout, MenuProps } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { Content, Menu, StyledLayout } from './uikit'

const { Sider } = Layout

const ModeratorPanel = () => {
  // useGetStoresData хук для получения данных из API и добавления их в mobx сторы
  useGetStoresData()

  // useGetCurrentActiveMenuKey для хранения локального состояния активного menu item-a
  const { activeKey, setActiveKey } = useGetCurrentActiveMenuKey()

  const handleActiveItemChange: MenuProps['onClick'] = (e) =>
    setActiveKey(e.key)

  return (
    <StyledLayout>
      <Sider>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          selectedKeys={[activeKey]}
          onClick={handleActiveItemChange}
        >
          <Menu.Item key='1'>
            <Link to='/'>Модерация заявок</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/add-material'>Добавить товар</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/catalog'>Каталог</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  )
}

export default ModeratorPanel
