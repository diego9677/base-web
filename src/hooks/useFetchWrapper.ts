import { useNavigate } from "react-router-dom";

const baseURL = '';

export class RequestError {
  status: number;
  message: string;
  url: string;
  additionalInfo?: any;

  constructor(status: number, message: string, url: string, additionalInfo?: object) {
    this.status = status;
    this.message = message;
    this.url = url;
    this.additionalInfo = additionalInfo;
  }
}

const baseHeaders: any = {
  'Content-Type': 'application/json',
};

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const useFetchWrapper = () => {
  const navigator = useNavigate();

  const _request = async (path: string, method: Method, body?: BodyInit | null | undefined, signal?: AbortSignal) => {

    const token = localStorage.getItem('token');
    if (token) {
      baseHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}/api${path}`, {
      method,
      mode: 'cors',
      headers: baseHeaders,
      body,
      signal
    });

    const json = await response.json();

    if (!response.ok) {
      const unauth = [401, 403];
      if (unauth.includes(response.status)) {
        // logout
        localStorage.removeItem('token');
        navigator('/login', { replace: true });
      }
      throw new RequestError(response.status, response.statusText, response.url, json);
    }

    return json;
  };

  const _get = async <T extends Object>(path: string, signal?: AbortSignal) => {
    const data: T = await _request(path, Method.GET, null, signal);
    return data;
  };

  const _post = async  <T extends Object>(path: string, body: any, signal?: AbortSignal) => {
    const parsed = JSON.stringify(body);
    const data: T = await _request(path, Method.POST, parsed, signal);
    return data;
  };

  const _put = async  <T extends Object>(path: string, body: any, signal?: AbortSignal) => {
    const parsed = JSON.stringify(body);
    const data: T = await _request(path, Method.PUT, parsed, signal);
    return data;
  };

  const _delete = async  <T extends Object>(path: string, signal?: AbortSignal) => {
    const data: T = await _request(path, Method.DELETE, null, signal);
    return data;
  };

  return {
    get: _get,
    post: _post,
    put: _put,
    delete: _delete,
  };
};