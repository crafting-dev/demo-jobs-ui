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
  postings?: Posting[]
  applications?: Application[]
}

export interface Employer {
  id: number
  name?: string
  location?: string
}

export interface Worker {
  id: number
  name?: string
}

export interface Posting {
  id: number
  title?: string
  status?: string
  description?: string
  createdAt: string | number
  hours?: number
  tags?: string
  employer?: Employer
  applications?: Application[]
}

export interface Application {
  id: number
  name?: string // Worker name
  status?: string
  tags?: string
  content?: string
  posting?: Posting
  createdAt: string | number
  worker?: Worker
}
