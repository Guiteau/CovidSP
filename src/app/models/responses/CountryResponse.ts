import { UserResponse } from "./UserResponse";

export class CountryResponse{

    countryCode: string;
    countryName: string;
    userResponseList: UserResponse[] = [];

    constructor(countryCode: string, contryName: string, userResponseList: UserResponse[]){

        this.countryCode = countryCode;
        this.countryName = contryName;
        this.userResponseList = userResponseList;
    }
}