import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';
import { UserRole } from './enum/user.role';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserProfile(@Request() req) {
    return await this.usersService.findUserProfile(req);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @Body() updateUser: UpdateUserDto,
    @Request() req,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(req.user.id, updateUser);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete()
  async deleteUser(@Request() req): Promise<string> {
    try {
      await this.usersService.deleteUser(req.user.id);
      return 'Usuário deletado com sucesso';
    } catch (error) {
      return error;
    }
  }
}
