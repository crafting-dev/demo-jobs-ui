import {
  ProfileSpec,
  ResponseDecorator,
  AuthSpec,
  PostingSpec,
  ApplicationSpec,
} from 'common/backend-client/types';
import { unauthenticated } from 'common/helpers';
import { Auth } from 'common/types';
import {
  convertApplicationSpecToApplication,
  convertAuthSpecToAuth,
  convertPostingSpecToPosting,
  convertProfileSpecToProfile,
} from 'common/utils';

export class Client {
  private key = '__CRAFTING_JOBS_AUTH_KEY__';

  private store = sessionStorage;

  private urlPrefix: string;

  private auth: Auth;

  constructor(auth?: Auth) {
    this.auth = auth ?? unauthenticated;

    if (process.env.REACT_APP_BACKEND_API_URL) {
      this.urlPrefix = process.env.REACT_APP_BACKEND_API_URL;
    } else if (/^http:\/\/localhost:[0-9]*$/.test(window.location.origin)) {
      this.urlPrefix = 'http://localhost:3001';
    } else {
      this.urlPrefix = window.location.origin;
    }
  }

  public async login(
    email: string,
    password: string
  ): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/authenticate`;
    const token = btoa(`${email}:${password}`);

    const resp = await Client.request(url, token, 'post', 'Basic');

    if (!resp.ok) {
      return {
        error: 'Incorrect Email/Password combination',
      };
    }

    const authInfo = (await resp.json()) as AuthSpec | null;
    if (!authInfo) {
      return {
        error: 'User info unavailable',
      };
    }

    const auth = convertAuthSpecToAuth(authInfo, this.auth);

    this.setUserSession(auth);

    return {
      data: auth,
    };
  }

  public async logout(): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/authenticate/${this.auth.id}`;

    const resp = await Client.request(url, this.auth.token, 'delete');
    if (!resp.ok) {
      return {
        error: 'Logout unsuccessful',
      };
    }

    this.deleteUserSession();

    return {
      data: unauthenticated,
    };
  }

  public async signup(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    otherKey: string,
    otherValue: string,
    objType: string,
    tags?: string
  ): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/${objType}s`;

    const resp = await Client.request(url, undefined, 'post', '', {
      [objType]: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        [otherKey]: otherValue,
        ...(tags && { tag_attributes: { content: tags } }),
      },
    });
    if (!resp.ok) {
      return {
        error: JSON.parse(await resp.text()).message,
      };
    }

    const data = await resp.json();
    if (!data) {
      return {
        error: 'Signup unsuccessful',
      };
    }

    return { data };
  }

  public async getProfile(): Promise<ResponseDecorator> {
    const url = `${
      this.urlPrefix
    }/api/v1/${this.auth.type?.toLocaleLowerCase()}s/${this.auth.bearerId}`;

    const resp = await Client.request(url, this.auth.token, 'get');
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const profileSpec = (await resp.json()) as ProfileSpec | null;
    if (!profileSpec) {
      return {
        error: 'Profile data unavailable',
      };
    }

    const profile = convertProfileSpecToProfile(profileSpec);

    return {
      data: profile,
    };
  }

  public async createPosting(
    title: string,
    description: string,
    hours: number,
    status: string,
    bearerId: number,
    tags: string[]
  ): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/postings`;

    const resp = await Client.request(url, this.auth.token, 'post', undefined, {
      title,
      description,
      hours,
      status,
      employer_id: bearerId,
      tag_attributes: {
        content: tags.join(', '),
      },
    });

    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const postingSpec = (await resp.json()).data as PostingSpec | null;
    if (!postingSpec) {
      return {
        error: 'Posting info unavailable',
      };
    }

    const posting = convertPostingSpecToPosting(postingSpec);

    return {
      data: posting,
    };
  }

  public async getPostings(): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/postings`;

    const resp = await Client.request(url, this.auth.token);
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const postingSpec = (await resp.json()).data as PostingSpec[] | null;
    if (!postingSpec) {
      return {
        error: 'Postings list unavailable',
      };
    }

    const postings = postingSpec.map((post) =>
      convertPostingSpecToPosting(post)
    );

    return {
      data: postings,
    };
  }

  public async getPosting(id: string): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/postings/${id}`;

    const resp = await Client.request(url, this.auth.token);
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const postingSpec = (await resp.json()).data as PostingSpec | null;
    if (!postingSpec) {
      return {
        error: 'Posting info unavailable',
      };
    }

    const posting = convertPostingSpecToPosting(postingSpec);

    return {
      data: posting,
    };
  }

  public async createApplication(
    content: string,
    status: string,
    postingId: number,
    workerId: number,
    tags: string[]
  ): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/applications`;

    const resp = await Client.request(url, this.auth.token, 'post', undefined, {
      content,
      status,
      posting_id: postingId,
      worker_id: workerId,
      tag_attributes: { content: tags.join(', ') },
    });

    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const applicationSpec = (await resp.json()).data as ApplicationSpec | null;
    if (!applicationSpec) {
      return {
        error: 'Application info unavailable',
      };
    }

    const application = convertApplicationSpecToApplication(applicationSpec);

    return {
      data: application,
    };
  }

  public async getApplications(): Promise<ResponseDecorator> {
    const url = `${this.urlPrefix}/api/v1/applications`;

    const resp = await Client.request(url, this.auth.token);
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const applicationSpec = (await resp.json()).data as
      | ApplicationSpec[]
      | null;
    if (!applicationSpec) {
      return {
        error: 'Applications list unavailable',
      };
    }

    const applications = applicationSpec.map((app) =>
      convertApplicationSpecToApplication(app)
    );

    return {
      data: applications,
    };
  }

  public async getApplication(id: string) {
    const url = `${this.urlPrefix}/api/v1/applications/${id}`;

    const resp = await Client.request(url, this.auth.token);
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    const applicationSpec = (await resp.json()).data as ApplicationSpec | null;
    if (!applicationSpec) {
      return {
        error: 'Application info unavailable',
      };
    }

    const application = convertApplicationSpecToApplication(applicationSpec);

    return {
      data: application,
    };
  }

  public async updateApplicationStatus(id: string, status: string) {
    const url = `${this.urlPrefix}/api/v1/applications/${id}`;

    const resp = await Client.request(url, this.auth.token, 'put', undefined, {
      status,
    });
    if (!resp.ok) {
      return {
        error: await resp.text(),
      };
    }

    return {};
  }

  public getUserSession(): Auth | null {
    const loggedInUser = this.store.getItem(this.key);

    if (loggedInUser) {
      return JSON.parse(loggedInUser);
    }

    return null;
  }

  public setUserSession(user: Auth) {
    this.store.setItem(this.key, JSON.stringify(user));
  }

  public deleteUserSession() {
    this.store.removeItem(this.key);
  }

  private static async request(
    url: string,
    token?: string,
    method?: string,
    scheme?: string,
    body?: any,
    headers?: HeadersInit
  ) {
    return fetch(url, {
      method,
      headers: {
        ...headers,
        Authorization: `${scheme ?? 'Bearer'} ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}
