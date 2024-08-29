import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UsersRepository } from "./users.repository";
import { UpdateRoleDto } from "./dtos/updateRole.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    try {
      const hashedPassword = await hash(data.password, 10);

      await this.usersRepository.createUser({
        ...data,
        password: hashedPassword,
      });

      return {
        message: "User created.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findUsers() {
    try {
      return this.usersRepository.findUsers();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateRole(userId: number, data: UpdateRoleDto) {
    try {
      await this.usersRepository.updateRole(userId, data.isAdmin);

      return {
        message: "Role updated.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
