import { Route } from './models/types'
import Apply from './pages/Apply'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Create from './pages/Create'
import Postings from './pages/Postings'
import Dashboard from './pages/Dashboard'
import ViewPosting from './pages/ViewPosting'
import Applications from './pages/Applications'
import ViewApplication from './pages/ViewApplication'

const Routes: Route[] = [
  {
    path: '/login',
    page: Login,
    private: false,
  },
  {
    path: '/signup',
    page: Signup,
    private: false,
  },
  {
    path: '/dashboard',
    page: Dashboard,
    private: true,
  },
  {
    path: '/create/posting',
    page: Create,
    private: true,
  },
  {
    path: '/postings/:id/apply',
    page: Apply,
    private: true,
  },
  {
    path: '/postings/:id',
    page: ViewPosting,
    private: true,
  },
  {
    path: '/postings',
    page: Postings,
    private: true,
  },
  {
    path: '/applications/:id',
    page: ViewApplication,
    private: true,
  },
  {
    path: '/applications',
    page: Applications,
    private: true,
  },
  {
    path: '/',
    page: Login,
    private: false,
  },
]

export { Routes }
