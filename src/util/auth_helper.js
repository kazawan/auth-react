export function saveLogin(data,callback) {
    localStorage.setItem('username', data.username);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessTokenExp', data.accessTokenExp);
    localStorage.setItem('accessTokenCreateAt', data.accessTokenCreateAt);
    localStorage.setItem('refreshTokenExp', data.refreshTokenExp);
    localStorage.setItem('refreshTokenCreateAt', data.refreshTokenCreateAt);
    localStorage.setItem('isLogin', true);
    localStorage.setItem('email', data.email);  
    
    callback();
}

export function removeLogout(callback) {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExp');
    localStorage.removeItem('refreshTokenExp');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('accessTokenCreateAt');
    localStorage.removeItem('refreshTokenCreateAt');
    localStorage.removeItem('email');
    callback();
}