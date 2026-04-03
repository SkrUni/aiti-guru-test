import axios from 'axios';
import type { AuthUser } from '../types';

const BASE = 'https://dummyjson.com';

export async function loginApi(username: string, password: string): Promise<AuthUser> {
  const { data } = await axios.post(`${BASE}/auth/login`, {
    username,
    password,
    expiresInMins: 60,
  });
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    token: data.accessToken,
  };
}
