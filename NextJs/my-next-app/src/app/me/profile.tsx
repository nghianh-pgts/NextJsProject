"use client";
import accountApiRequest from "@/apiRequests/account";
import { ClientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";

import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    console.log(ClientSessionToken.value);
    const fetchRequest = async () => {
      try {
        const result = accountApiRequest.meClient();
        console.log(result);
      } catch (error) {
        handleErrorApi({ error });
      }
    };

    fetchRequest();
  }, []);

  return <div>Profile</div>;
};

export default Profile;
