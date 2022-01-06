import {
  Applications,
  CreateApplication,
  ViewApplication,
  ActiveApplications,
} from 'pages/Applications';
import { Dashboard } from 'pages/Dashboard';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import {
  CreatePosting,
  MyActivePostings,
  MyPostings,
  Postings,
  ViewPosting,
} from 'pages/Postings';
import { Signup } from 'pages/Signup';

export interface Route {
  path: string;
  page: () => JSX.Element;
  protected: boolean;
}

export const routes: Route[] = [
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
    path: '/postings/create',
    page: CreatePosting,
    protected: true,
  },
  {
    path: '/postings/personal/active',
    page: MyActivePostings,
    protected: true,
  },
  {
    path: '/postings/personal',
    page: MyPostings,
    protected: true,
  },
  {
    path: '/postings/:id/apply',
    page: CreateApplication,
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
    path: '/applications/active',
    page: ActiveApplications,
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
];
