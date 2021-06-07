import { CountryResponse } from "./CountryResponse";
import { SessionResponse } from "./SessionResponse";

export class UserResponse{
    
    id: number;
    birthDate: number;
    email: string;
    password: string;
    sex: string;
    userName: string;
    userSurname: string;
    sessionResponseList: SessionResponse[] = [];
    countryResponse: CountryResponse;
    
    constructor(id: number, birthDate: number, email: string, password: string, sex: string, userName: string, userSurname: string,
        sessionResponseList: SessionResponse[] = [], countryResponse: CountryResponse){

            this.id = id;
            this.birthDate = birthDate;
            this.email = email;
            this.password = password;
            this.sex = sex;
            this.userName = userName;
            this.userSurname = userSurname;
            this.sessionResponseList = sessionResponseList;
            this.countryResponse = countryResponse;
    }

}