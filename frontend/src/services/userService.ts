import type { User } from '../types/User';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/users' : 'http://localhost:8081/api/users';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  if (response.status === 204) {
    // No content
    return null;
  }
  return await response.json();
}

export async function createUser(user: User): Promise<User> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await handleResponse(response);
}

export async function registerAdmin(user: User): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/register-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await handleResponse(response);
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(API_BASE_URL, {
    method: 'GET',
  });
  return await handleResponse(response);
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
  });
  return await handleResponse(response);
}

export async function approveUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/${id}/approve`, {
    method: 'PUT',
  });
  return await handleResponse(response);
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
}
