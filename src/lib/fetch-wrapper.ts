
const ApiUrl = 'http://localhost:3000/api';

const headers = {
  'Content-Type': 'application/json'
};

class FetchWrapper {


  public async get<T extends Object>(path: string, signal?: AbortSignal) {
    const url = `${ApiUrl}${path}`;
    const response = await fetch(url, { headers, signal });
    const json: T = await response.json();
    return json;
  }

  public async post<T extends Object>(path: string, body: any, signal?: AbortSignal) {
    const url = `${ApiUrl}${path}`;
    const response = await fetch(url, { headers, body: JSON.stringify(body), method: 'POST', signal });
    const json: T = await response.json();
    return json;
  }

  public async put<T extends Object>(path: string, body: any, signal?: AbortSignal) {
    const url = `${ApiUrl}${path}`;
    const response = await fetch(url, { headers, method: 'PUT', body: JSON.stringify(body), signal });
    const json: T = await response.json();
    return json;
  }

  public async delete<T extends Object>(path: string, signal?: AbortSignal) {
    const url = `${ApiUrl}${path}`;
    const response = await fetch(url, { headers, method: 'DELETE', signal });
    const json: T = await response.json();
    return json;
  }


}

export const fetchWrapper = new FetchWrapper();
