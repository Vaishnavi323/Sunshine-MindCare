import axiosInstance from "./axiosinstance";

export const adminLogin = (email, password) =>{
    return axiosInstance.post("/admin/login", {email,password});
}