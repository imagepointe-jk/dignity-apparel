import { NextRequest } from "next/server";

export function getDevPassword(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  const split = authorization?.split(" ");
  const givenPassword = split ? split[1] : undefined;
  const decoded = givenPassword ? atob(givenPassword) : undefined;
  const decodedSplit = decoded?.split(":");
  return decodedSplit ? decodedSplit[1] : undefined;
}
