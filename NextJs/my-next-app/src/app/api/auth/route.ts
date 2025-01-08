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

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken = ${sessionToken}; Path=/; HttpOnly; Secure`,
    },
  });
}
