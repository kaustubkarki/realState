import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
//! since we use the single page to load data by //:id method we can only pass params.id loader, auta use garna arko garnai parxa
export const listPageLoader = async ({ request, params }) => {
  console.log(request);
  const query = request.url.split("?")[1];
  const res = apiRequest("/posts?" + query);
  // return defer({
  //   postResponse: postPromise,
  // });
  return res;
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
