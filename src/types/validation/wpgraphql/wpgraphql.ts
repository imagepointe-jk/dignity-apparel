import {
  loginResponseSchema,
  userJwtSchema,
  userResponseSchema,
} from "@/types/schema/wpgraphql";

export function validateLoginResponse(json: unknown) {
  return loginResponseSchema.parse(json);
}

export function validateUserResponse(json: unknown) {
  return userResponseSchema.parse(json);
}

export function validateUserJwt(jwtPayload: unknown) {
  return userJwtSchema.parse(jwtPayload);
}
