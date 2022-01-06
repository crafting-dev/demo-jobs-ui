import { Auth, Posting, Profile, Application, Worker } from 'common/types';

import {
  ApplicationSpec,
  AuthSpec,
  PostingSpec,
  ProfileSpec,
} from './backend-client/types';

export const convertAuthSpecToAuth = (
  authSpec: AuthSpec,
  auth: Auth
): Auth => ({
  redirectPath: auth.redirectPath,
  token: authSpec.data.attributes.token,
  id: authSpec.data.id,
  bearerId: authSpec.data.attributes.bearer.id,
  name: authSpec.data.attributes.bearer.name,
  email: authSpec.data.attributes.bearer.email,
  type: authSpec.data.attributes.bearer.type,
  avatarUrl: authSpec.data.attributes.bearer.avatar,
  isAuthenticated: true,
});

export const convertProfileSpecToProfile = (
  profileSpec: ProfileSpec
): Profile => ({
  id: Number(profileSpec.data.id),
  type: profileSpec.data.type,
  name: profileSpec.data.attributes.name,
  email: profileSpec.data.attributes.email,
  location: profileSpec.data.attributes.location,
  hourlyRate: profileSpec.data.attributes.hourlyRate,
  avatar: profileSpec.data.attributes.avatar,
  tags: profileSpec.data.attributes.tags,
  postings: profileSpec.data.attributes.postings,
  applications: profileSpec.data.attributes.applications,
});

export const convertPostingSpecToPosting = (
  postingSpec: PostingSpec
): Posting => ({
  id: Number(postingSpec.id),
  createdAt: postingSpec.attributes.createdAt,
  title: postingSpec.attributes.title,
  status: postingSpec.attributes.status,
  description: postingSpec.attributes.description,
  hours: postingSpec.attributes.hours,
  tags: postingSpec.attributes.tags,
  employer: postingSpec.attributes.employer,
  applications: postingSpec.attributes.applications as Application[],
});

export const convertApplicationSpecToApplication = (
  applicationSpec: ApplicationSpec
): Application => ({
  id: Number(applicationSpec.id),
  createdAt: applicationSpec.attributes.createdAt,
  title: applicationSpec.attributes.posting.title,
  status: applicationSpec.attributes.status,
  name: applicationSpec.attributes.worker.name,
  tags: applicationSpec.attributes.tags,
  content: applicationSpec.attributes.content,
  posting: applicationSpec.attributes.posting as Posting,
  worker: applicationSpec.attributes.worker as Worker,
});
