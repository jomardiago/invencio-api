import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UsersRepository } from "./users.repository";
import { UpdateRoleDto } from "./dtos/updateRole.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    try {
      const user = await this.usersRepository.findUserByEmail(data.email);
      if (user) throw new ConflictException("User already exists.");

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

  findUsers() {
    try {
      return this.usersRepository.findUsers();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findUsersCount() {
    try {
      return this.usersRepository.findUsersCount();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateRole(userId: number, data: UpdateRoleDto) {
    try {
      const user = await this.usersRepository.findUserById(userId);
      if (!user) throw new NotFoundException("User does not exists.");

      await this.usersRepository.updateRole(userId, data.isAdmin);

      return {
        message: "Role updated.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.usersRepository.findUserById(userId);
      if (!user) throw new NotFoundException("User does not exists.");

      await this.usersRepository.deleteUser(userId);

      return {
        message: "User deleted.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
