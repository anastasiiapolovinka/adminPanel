import { observer } from 'mobx-react-lite'
import ModeratorPanel from './components/ModeratorPanel.tsx'
import RequestDetail from './components/requests/RequestDetail.tsx'
import AddMaterial from './components/AddMaterial.tsx'
import CatalogView from './components/CatalogView.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequestList from './components/requests/RequestList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ModeratorPanel />,
    children: [
      {
        path: '/',
        element: <RequestList />,
      },
      {
        path: '/add-material',
        element: <AddMaterial />,
      },
      {
        path: '/request/:id',
        element: <RequestDetail />,
      },
      {
        path: '/catalog',
        element: <CatalogView />,
      },
    ],
  },
])

const App = observer(() => {
  return <RouterProvider router={router} />
})

export default App
