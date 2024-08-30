import { BadRequestException, Injectable } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository";
import { CreateProfileDto } from "./dtos/createProfile.dto";

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async createProfile(userId: number, data: CreateProfileDto) {
    try {
      const profile = await this.profilesRepository.findProfileByUserId(userId);
      if (profile)
        throw new BadRequestException(
          "An existing profile is found for this user.",
        );

      await this.profilesRepository.createProfile(userId, data);

      return {
        message: "Profile created.",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findProfile(userId: number) {
    try {
      return this.profilesRepository.findProfileByUserId(userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
