export const handleStorageToken = (token,id) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('id',id);
  };
export const removeAccessToken = () => {
    localStorage.removeItem('persist:accessToken')
    localStorage.removeItem('id')
  };
  