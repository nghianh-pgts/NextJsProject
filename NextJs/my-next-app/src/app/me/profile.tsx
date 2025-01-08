"use client";
import accountApiRequest from "@/apiRequests/account";
import { ClientSessionToken } from "@/lib/http";

import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    console.log(ClientSessionToken.value);
    const fetchRequest = async () => {
      const result = accountApiRequest.meClient();
      console.log(result);
    };
  }, []);

  return <div>Profile</div>;
};

export default Profile;
