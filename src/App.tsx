import { useRoutes } from 'react-router-dom'
import Taskboard from './components/taskboard/taskboard'
import MainLayout from './layouts/mainLayout'
import Calendar from './pages/calendar/calendar'
import Chartjs from './pages/chartjs/chartjs'
import Chat from './pages/chat/chat'
import Contacts from './pages/contacts/contacts'
import Dashboard from './pages/dashboard/dashboard'
import Echarts from './pages/echarts/echarts'
import Faq from './pages/faq/faq'
import Gauges from './pages/gauges/gauges'
import ImageGallery from './pages/imageGallery/imageGallery'
import Inbox from './pages/inbox/inbox'
import Login from './pages/login/login'
import SearchResults from './pages/searchResults/searchResults'

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
        {path:'calendar', element:<Calendar/>},
        {path:'search-results', element:<SearchResults/>},
        {path:'image-gallery', element:<ImageGallery/>},
        {path:'faq', element:<Faq/>},
      ],
    },
    {path:'login',element:<Login/>}
   ])

  return routes
}

export default App
