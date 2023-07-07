import axios from "axios";
// import { AuthHeader } from "./Constants";

export const axiosInstance = axios.create({
  baseURL: "/api",
  maxRedirects: 2,
  // transformRequest: [
  //   (data, header) => {
  //     const email = localStorage.getItem("email");
  //     // TODO: Encrypt the email before sending
  //     if (email) header.set(AuthHeader, email);
  //     return data;
  //   },
  // ],
});
