import React from "react";
import envConfig from "../../../config";
import { cookies } from "next/headers";
import { Result } from "postcss";
import http from "@/lib/http";
import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import ProfileForm from "@/app/me/profile-form";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  // console.log(result);

  return (
    <div>
      Profile page
      <div>xin chào {result.payload.data.name}</div>
      {/* <Profile /> */}
      <ProfileForm profile={result.payload.data} />
    </div>
  );
};

export default MeProfile;
