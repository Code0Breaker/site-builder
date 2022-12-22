import { useRoutes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/mainLayout'
import Chat from './pages/chat/chat'
import Dashboard from './pages/dashboard/dashboard'
import Inbox from './pages/inbox/inbox'

function App() {
   const routes = useRoutes([
    {
      path:'', 
      element:<MainLayout/>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'inbox', element:<Inbox/>},
        {path:'chat', element:<Chat/>}
      ]
    }
   ])

  return routes
}

export default App
