export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 
      'Authorization': `access_token ` + `${user.accessToken}`,
      'Accept': `application/json`,
      'Content-Type': `application/json`
     }; 
  } else {
    return {};
  }
}
