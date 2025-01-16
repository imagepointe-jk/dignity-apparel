import { env } from "@/env";
import { validateLoginResponse } from "@/types/validation/wpgraphql/wpgraphql";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const jwtResponse = await fetch(`${env.WOOCOMMERCE_STORE_URL}graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          mutation LoginUser {
            login( input: {
              username: "${body.username}",
              password: "${body.password}"
            } ) {
              authToken
              user {
                id
                databaseId
                name
              }
            }
          }
        `,
    }),
  });
  if (!jwtResponse.ok) {
    console.error(
      `Error ${jwtResponse.text}=============================================`
    );
  }
  const jwtJson = await jwtResponse.json();
  const authStatus = detectAuthStatus(jwtJson);
  if (authStatus.status !== 200 || !authStatus.user) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: authStatus.status }
    );
  }

  const response = NextResponse.json(authStatus.user);
  response.cookies.set("wp_jwt_auth", jwtJson.data.login.authToken, {
    httpOnly: true,
  });
  response.cookies.set("wp_user_id", jwtJson.data.login.user.id, {
    httpOnly: true,
  });

  return response;
}

function detectAuthStatus(authJson: unknown) {
  const parsed = validateLoginResponse(authJson);
  const notAuthenticatedError = parsed.errors?.find((error) =>
    error.message.toLocaleLowerCase().includes("unknown username")
  );
  if (notAuthenticatedError) {
    return {
      status: 401,
    };
  }
  return {
    status: 200,
    user: parsed.data.login?.user,
  };
}
