import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/accountSchema";
import { SourceTextModule } from "vm";

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
  updateMe: (body: UpdateMeBodyType) => {
    http.put<AccountResType>("account/me", body);
  },
};

export default accountApiRequest;
