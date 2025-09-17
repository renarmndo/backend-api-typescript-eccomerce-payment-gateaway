import type { Response } from "express";
export declare const sendResponse: <T>(res: Response, statusCode: number, success: boolean, msg: string, data?: T) => Response<any, Record<string, any>>;
export declare const sendError: <T>(res: Response, statusCode: number, msg: string, data?: T) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.utils.d.ts.map