export default function authHeader() {
  const token = localStorage.getItem('token');
  // const user = JSON.parse(localStorage.getItem('user'));
  return { Authorization: 'Bearer ' + token };
}
