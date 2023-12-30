import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
 
});

export const { useAddUserMutation, useLoginUserMutation } = authApi;
