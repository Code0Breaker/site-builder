import { useRoutes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/mainLayout'
import Chat from './pages/chat/chat'
import Dashboard from './pages/dashboard/dashboard'

function App() {
   const routes = useRoutes([
    {
      path:'', 
      element:<MainLayout/>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'chat', element:<Chat/>}
      ]
    }
   ])

  return routes
}

export default App
