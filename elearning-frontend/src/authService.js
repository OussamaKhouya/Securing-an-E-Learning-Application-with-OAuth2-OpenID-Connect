import axios from 'axios';
import keycloak from './keycloak';

const apiUrl = 'http://localhost:8081/api';

export function getToken() {
  return keycloak.token;
}

export function getParsedToken() {
  return keycloak.tokenParsed || {};
}

export async function getUserInfo() {
  const token = getToken();
  return axios.get(
    'http://localhost:8080/realms/elearning-realm/protocol/openid-connect/userinfo',
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function getMe() {
  const token = getToken();
  return axios.get(`${apiUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getCourses() {
  const token = getToken();
  const response = await axios.get(`${apiUrl}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function addCourse(courseName) {
  const token = getToken();
  const response = await axios.post(`${apiUrl}/courses`, courseName, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

