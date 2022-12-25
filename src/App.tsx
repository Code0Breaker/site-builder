import { useRoutes } from 'react-router-dom'
import Taskboard from './components/taskboard/taskboard'
import MainLayout from './layouts/mainLayout'
import Chartjs from './pages/chartjs/chartjs'
import Chat from './pages/chat/chat'
import Contacts from './pages/contacts/contacts'
import Dashboard from './pages/dashboard/dashboard'
import Echarts from './pages/echarts/echarts'
import Gauges from './pages/gauges/gauges'
import Inbox from './pages/inbox/inbox'

function App() {
   const routes = useRoutes([
    {
      path:'', 
      element:<MainLayout/>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'inbox', element:<Inbox/>},
        {path:'chat', element:<Chat/>},
        {path:'contacts', element:<Contacts/>},
        {path:'echarts', element:<Echarts/>},
        {path:'chartjs', element:<Chartjs/>},
        {path:'taskboard', element:<Taskboard/>},
        {path:'gauges', element:<Gauges/>},
      ]
    }
   ])

  return routes
}

export default App
