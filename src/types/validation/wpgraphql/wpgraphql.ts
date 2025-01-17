import {
  loginResponseSchema,
  userJwtSchema,
  userDataSchema,
} from "@/types/schema/wpgraphql";

export function validateLoginResponse(json: unknown) {
  return loginResponseSchema.parse(json);
}

export function validateUserData(json: unknown) {
  return userDataSchema.parse(json);
}

export function validateUserJwt(jwtPayload: unknown) {
  return userJwtSchema.parse(jwtPayload);
}
