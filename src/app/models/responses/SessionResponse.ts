import { UserResponse } from "./UserResponse";

export class SessionResponse{
    
    id: number;
    ipAddress: string;
    sessionEnd: number;
    sessionStart: number;
    userResponse: UserResponse;

    constructor(id: number, ipAddress: string, sessionEnd: number, sessionStart: number, userResponse: UserResponse,){

        this.id = id;
        this.ipAddress = ipAddress;
        this.sessionEnd = sessionEnd;
        this.sessionStart = sessionStart;
        this.userResponse = userResponse;
    }
}