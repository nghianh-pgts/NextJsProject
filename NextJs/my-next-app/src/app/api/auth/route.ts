import { decodeJWT } from "@/lib/utils";

type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  useId: number;
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log("res.payload", res.payload);
  const sessionToken = res.sessionToken as string;

  if (!sessionToken) {
    return Response.json(
      {
        message: "Không nhận được session token",
      },
      {
        status: 400,
      }
    );
  }

  const payload = decodeJWT<PayloadJWT>(sessionToken);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken = ${sessionToken}; Path=/; HttpOnly;Expires=${expiresDate}`,
    },
  });
}
