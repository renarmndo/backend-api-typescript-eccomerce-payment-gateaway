import type { UserWitoutPassword } from "../utils/service.utils.js";
import type { RequestRegister, RequestLogin } from "../types/Api.types.js";
export declare class AuthServices {
    static register(data: RequestRegister): Promise<UserWitoutPassword>;
    static login(data: RequestLogin): Promise<any>;
}
//# sourceMappingURL=auth.services.d.ts.map