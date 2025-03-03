import { INTERNAL_SERVER_ERROR } from "./utility/statusCodes";

type AppErrorParams = {
  type: "Authentication" | "Client Request" | "Unknown";
  clientMessage?: string;
  serverMessage?: string;
  httpStatus?: number;
};
export class AppError extends Error {
  public readonly type;
  public readonly serverMessage;
  public readonly clientMessage;
  public readonly httpStatus;

  constructor(params: AppErrorParams) {
    super(params.serverMessage);

    this.type = params.type;
    this.serverMessage = params.serverMessage;
    this.clientMessage = params.clientMessage || "Unknown error.";
    this.httpStatus = params.httpStatus || INTERNAL_SERVER_ERROR;
  }
}
