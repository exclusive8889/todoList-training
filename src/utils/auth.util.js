export const handleStorageToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
export const removeAccessToken = () => {
    localStorage.removeItem('persist:user')
    localStorage.removeItem('accessToken')
  };
  