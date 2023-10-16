import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
  }),
  endpoints: (builder) => ({
    //creating the user
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user,
      }),
    }),
    //login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    //logout
    logOutUser: builder.mutation({
      query: (payload) => ({
        url: "/logOut",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLogOutUserMutation,
  useLoginUserMutation,
  useSignupUserMutation,
} = userApi;
export default userApi;
