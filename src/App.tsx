import { useRoutes } from 'react-router-dom'
import Taskboard from './components/taskboard/taskboard'
import MainLayout from './layouts/mainLayout'
import BlogList from './pages/blogList/blogList'
import Calendar from './pages/calendar/calendar'
import BlogCategories from './pages/categories/blogCategory'
import BlogTags from './pages/categories/blogTags'
import Chartjs from './pages/chartjs/chartjs'
import Chat from './pages/chat/chat'
import Contacts from './pages/contacts/contacts'
import Dashboard from './pages/dashboard/dashboard'
import Echarts from './pages/echarts/echarts'
import Faq from './pages/faq/faq'
import Gauges from './pages/gauges/gauges'
import HelperClasses from './pages/helperClasses/helperClasses'
import ImageGallery from './pages/imageGallery/imageGallery'
import Inbox from './pages/inbox/inbox'
import Languages from './pages/languages/languages'
import Login from './pages/login/login'
import Maps from './pages/maps/maps'
import NewPost from './pages/newPost/newPost'
import Pages from './pages/pages/pages'
import Post from './pages/posts/post'
import Posts from './pages/posts/posts'
import Register from './pages/register/register'
import SearchResults from './pages/searchResults/searchResults'
import Settings from './pages/settings/settings'
import Social from './pages/social/social'
import Summernote from './pages/summernote/summernote'
import Team from './pages/team/team'
import TypographySection from './pages/typography/typography'
import Users from './pages/users/users'

function App() {
  const routes = useRoutes([
     {path:'',element:<Login/>},
     {path:'register',element:<Register/>},
    {
      path:'home', 
      element:<MainLayout/>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'languages', element:<Languages/>},
        {path:'social', element:<Social/>},
        {path:'users', element:<Users/>},
        {path:'pages', element:<Pages/>},
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
        {path:'team', element:<Team/>},
        {path:'posts', element:<Posts/>},
        {path:'post/:id', element:<Post type='read'/>},
        {path:'post/edit/:id', element:<Post type='edit'/>},
        {path:'settings', element:<Settings/>},
        {path:'summernote', element:<Summernote/>},
        {path:'new-post', element:<NewPost/>},
        {path:'blog-tags', element:<BlogTags/>},
        {path:'categories', element:<BlogCategories/>},
        {path:'typography', element:<TypographySection/>},
        {path:'maps', element:<Maps/>},
        {path:'blog-list', element:<BlogList/>},
        {path:'helper-classes', element:<HelperClasses/>},
      ],
    },
   ])

  return routes
}

export default App
