import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MENU_ITEMS: Record<string, string> = {
  '/': '1',
  '/add-material': '2',
  '/catalog': '3',
}

const useGetCurrentActiveMenuKey = () => {
  const [activeKey, setActiveKey] = useState('1')
  const { pathname } = useLocation()
  useEffect(() => {
    const match = Object.keys(MENU_ITEMS).find((path) => path === pathname)
    if (match) {
      setActiveKey(MENU_ITEMS[match])
    }
  }, [pathname])

  return { activeKey, setActiveKey }
}

export default useGetCurrentActiveMenuKey
