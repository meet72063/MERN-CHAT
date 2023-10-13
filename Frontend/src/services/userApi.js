import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
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

    logOutUser: builder.mutation({
      query: (payload) => ({
        url: "logOut",
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
