export interface Auth {
  redirectPath: string;
  token?: string;
  id?: number;
  bearerId?: number;
  name?: string;
  email?: string;
  type?: string;
  avatarUrl?: string;
  isAuthenticated?: boolean;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  location?: string;
  hourlyRate?: number;
  tags?: string;
  avatar?: string;
  type?: string;
  postings?: Posting[];
  applications?: Application[];
}

export interface Employer {
  id: number;
  name?: string;
  location?: string;
}

export interface Worker {
  id: number;
  name?: string;
}

export interface Posting {
  id: number;
  createdAt: string | number;
  title?: string;
  status?: string;
  description?: string;
  hours?: number;
  tags?: string;
  employer?: Employer;
  applications?: Application[];
}

export interface Application {
  id: number;
  createdAt: string | number;
  name?: string; // Worker name
  status?: string;
  tags?: string;
  content?: string;
  posting?: Posting;
  worker?: Worker;
  title?: string;
}
