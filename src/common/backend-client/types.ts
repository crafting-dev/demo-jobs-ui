import { Auth, Profile, Posting, Application } from 'common/types';

export interface ResponseDecorator {
  error?: string;
  data?: Auth | Profile | Posting | Posting[] | Application | Application[];
}

export interface AuthSpec {
  data: {
    id: number;
    attributes: {
      token: string;
      bearer: {
        id: number;
        type: string;
        name: string;
        email: string;
        avatar: string;
      };
    };
  };
}

export interface ProfileSpec {
  data: {
    id: number;
    type: string;
    attributes: {
      name: string;
      email: string;
      tags: string;
      avatar: string;
      location: string;
      hourlyRate: number;
      postings: Posting[];
      applications: Application[];
    };
  };
}

export interface PostingSpec {
  id: number;
  type: string;
  attributes: {
    createdAt: string;
    description: string;
    hours: number;
    status: string;
    tags: string;
    title: string;
    employer: {
      id: number;
      name: string;
      location: string;
    };
    applications: {
      id: number;
      name: string;
      status: string;
    }[];
  };
}

export interface ApplicationSpec {
  id: string;
  type: string;
  attributes: {
    createdAt: string;
    status: string;
    tags: string;
    content: string;
    posting: {
      id: number;
      title: string;
    };
    worker: {
      id: number;
      name: string;
    };
  };
}
