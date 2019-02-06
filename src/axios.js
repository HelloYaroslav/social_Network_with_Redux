import * as axios from "axios";

let axiosInst = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
});

export const loginRequest = (email, password, rememberMe, captcha) =>
    axiosInst.post('auth/login', {
        email,
        password,
        rememberMe,
        captcha
    });


export const captchaRequest = () => axiosInst.get('security/get-captcha-url');


export const logOutRequest = () => axiosInst.post('auth/logout');

export const isLogged = () => axiosInst.get('auth/me');