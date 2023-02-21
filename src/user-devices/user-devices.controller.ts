import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  ConflictException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { UserDevice } from './entities/user-device.entity';
import { LocalRole } from './enum/local.role';
import { RolesGuard } from 'src/core/auth/guards/roles/roles.guard';
import { UserRole } from 'src/users/enum/user.role';
import { Roles } from 'src/core/auth/guards/decorators/roles.decorator';

@Controller('userDevices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Body() createUserDeviceDto: CreateUserDeviceDto,
    @Param('id') _id: number,
    @Request() req,
  ) {
    const userDevice = await this.userDevicesService.create(
      createUserDeviceDto,
      req.user.id,
      _id,
    );
    if (!userDevice) {
      throw new ConflictException({
        statusCode: 404,
        message: 'Device not found',
      });
    }
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        _id: `userDevices_id: ${userDevice._id}`,
        user_id: `user_id: ${userDevice.user._id}`,
        device_id: `device_id: ${userDevice.devices._id}`,
      })
      .withBody(userDevice)
      .build();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDevices(
    @Request() req,
    @Query('local') local: LocalRole,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<UserDevice[]> {
    return await this.userDevicesService.getUserDevices(req, local, page, size);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') _id: number) {
    try {
      await this.userDevicesService.delete(_id);
      return 'User Device deleted successfully';
    } catch (error) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      });
    }
  }
}
