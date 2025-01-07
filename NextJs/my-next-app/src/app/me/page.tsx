import React from "react";
import envConfig from "../../../config";
import { cookies } from "next/headers";
import { Result } from "postcss";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);

  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
      method: "GET",
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };

    if (!res.ok) {
      throw data;
    }
    return data;
  });

  console.log(result);

  return (
    <div>
      Profile page
      <div>xin chào {result.payload.data.name}</div>
    </div>
  );
};

export default MeProfile;
