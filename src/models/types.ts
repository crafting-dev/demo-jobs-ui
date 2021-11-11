import React from 'react'
import { RouteProps } from 'react-router-dom'

export type ProtectedRouteProps = {
  isAuthenticated: boolean
  redirectPath: string
  setRedirectPath: (path: string) => void
} & RouteProps

export interface Route {
  path: string
  page: React.FunctionComponent
  protected: boolean
}

export interface Auth {
  token?: string
  id?: number
  bearerId?: number
  name?: string
  email?: string
  type?: string
  avatarUrl?: string
  isAuthenticated?: boolean
  redirectPath: string
}

export interface Profile {
  id: number
  name: string
  email: string
  location?: string
  hourlyRate?: number
  tags?: string
  avatar?: string
  type?: string
  postings?: Posting[] | undefined
  applications?: Application[] | undefined
}

export interface Employer {
  id: number
  name?: string | undefined
  location?: string | undefined
}

export interface Worker {
  id: number
  name?: string | undefined
}

export interface Posting {
  id: number
  title?: string | undefined
  status?: string | undefined
  description?: string | undefined
  createdAt: string | number
  hours?: number | undefined
  tags?: string | undefined
  employer?: Employer | undefined
  applications?: Application[] | undefined
}

export interface Application {
  id: number
  name?: string | undefined // Worker name
  status?: string | undefined
  tags?: string | undefined
  content?: string | undefined
  posting?: Posting | undefined
  createdAt: string | number
  worker?: Worker | undefined
}
