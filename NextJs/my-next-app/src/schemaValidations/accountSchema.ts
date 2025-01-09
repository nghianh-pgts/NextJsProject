import { z } from "zod";

const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    message: z.string(),
  })
  .strict();

type AccountResType = z.TypeOf<typeof AccountRes>;

const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

export { AccountRes, type AccountResType, UpdateMeBody, type UpdateMeBodyType };
