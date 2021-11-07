import { Route } from './models/types'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Create from './pages/protected/postings/Create'
import Postings from './pages/protected/postings/Postings'
import Dashboard from './pages/protected/Dashboard'
import ViewPosting from './pages/protected/postings/ViewPosting'
import Apply from './pages/protected/applications/Apply'
import Applications from './pages/protected/applications/Applications'
import ViewApplication from './pages/protected/applications/ViewApplication'
import Home from './pages/Home'

const Routes: Route[] = [
  {
    path: '/login',
    page: Login,
    protected: false,
  },
  {
    path: '/signup',
    page: Signup,
    protected: false,
  },
  {
    path: '/dashboard',
    page: Dashboard,
    protected: true,
  },
  {
    path: '/create/posting',
    page: Create,
    protected: true,
  },
  {
    path: '/postings/:id/apply',
    page: Apply,
    protected: true,
  },
  {
    path: '/postings/:id',
    page: ViewPosting,
    protected: true,
  },
  {
    path: '/postings',
    page: Postings,
    protected: true,
  },
  {
    path: '/applications/:id',
    page: ViewApplication,
    protected: true,
  },
  {
    path: '/applications',
    page: Applications,
    protected: true,
  },
  {
    path: '/',
    page: Home,
    protected: false,
  },
]

export { Routes }
