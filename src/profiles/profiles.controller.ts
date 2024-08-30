import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "@prisma/client";
import { CreateProfileDto } from "./dtos/createProfile.dto";

@Controller({
  path: "profiles",
  version: "1",
})
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  createProfile(
    @Request() req: { user: User },
    @Body() data: CreateProfileDto,
  ) {
    return this.profilesService.createProfile(req.user.id, data);
  }

  @Get("user-profile")
  findProfile(@Request() req: { user: User }) {
    return this.profilesService.findProfile(req.user.id);
  }
}
