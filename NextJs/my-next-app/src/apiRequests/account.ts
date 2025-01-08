import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/accountSchema";

const accountApiRequest = {
  me: (sesionToken: string) =>
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sesionToken}`,
      },
    }),
  meClient: () => {
    http.get<AccountResType>("account/me");
  },
};

export default accountApiRequest;
