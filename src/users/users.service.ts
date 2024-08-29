import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  createUser() {
    try {
      return {
        message: "createUser api hit!",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
