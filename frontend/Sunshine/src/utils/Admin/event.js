
import axiosInstance from "./axiosinstance";

export const addEvent = async (formData) => {
  return await axiosInstance.post("/event/add", formData);
};

export const getEvents =async() =>{

    return await axiosInstance.get("/event/list");
};

export const updateEvent = async (id, formData) => {
  return await axiosInstance.post(`/admin/editEvent/${id}`, formData);
};

export const deleteEvent = async (id) => {
  return await axiosInstance.post(`/admin/deleteEvent/${id}`);
};