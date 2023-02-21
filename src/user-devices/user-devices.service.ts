import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Device } from '../devices/entities/device.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UserDevice } from './entities/user-device.entity';
import { LocalRole } from './enum/local.role';

@Injectable()
export class UserDevicesService {
  constructor(
    @Inject('USER_DEVICES_REPOSITORY')
    private userDeviceRepository: Repository<UserDevice>,
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: Repository<Device>,
  ) {}

  async create(
    createUserDeviceDto: CreateUserDeviceDto,
    UserID,
    DeviceID,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const Checkdevice = await this.Checkdevice(DeviceID);
        if (Checkdevice) {
          const DeviceEntity = new Device();
          const userEntity = new UserEntity();
          const userDevice = new UserDevice();

          DeviceEntity._id = DeviceID;
          userEntity._id = UserID;

          userDevice.user = userEntity;
          userDevice.devices = DeviceEntity;
          userDevice.is_on = true;
          userDevice.local = createUserDeviceDto.local;
          userDevice.room = createUserDeviceDto.room;

          const create = await this.userDeviceRepository.save(userDevice);
          resolve(create);
        }
        resolve(false);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }
  async Checkdevice(DeviceID: number) {
    const Checkdevice: Device = await this.deviceRepository.findOne({
      where: { _id: DeviceID },
    });
    if (!Checkdevice) {
      return false;
    }
    return true;
  }
  async getUserDevices(
    req: any,
    local: any,
    page: number,
    size: number,
  ): Promise<UserDevice[]> {
    try {
      const regexCasa = /^casa$/i;
      const regexEscritorio = /^escrit[óo]rio$/i;
      const regexFabrica = /^f[áa]brica$/i;

      if (regexCasa.test(local)) {
        local = LocalRole.CASA;
      } else if (regexEscritorio.test(local)) {
        local = LocalRole.Escritório;
      } else if (regexFabrica.test(local)) {
        local = LocalRole.Fábrica;
      }

      const pages = page || 1;
      const perPage = size || 10;

      const userId = req.user.id;
      let user_devices: UserDevice[];

      if (local === null || local === undefined) {
        user_devices = await this.userDeviceRepository
          .createQueryBuilder('user_devices')
          .leftJoinAndSelect('user_devices.devices', 'devices')
          .leftJoinAndSelect('user_devices.user', 'user')
          .select([
            'user_devices._id',
            'user_devices.is_on',
            'user_devices.local',
            'user_devices.room',
            'devices._id',
            'devices.name',
            'devices.type',
            'user._id',
          ])
          .where('user_devices.user = :userId', { userId })
          .skip((pages - 1) * perPage)
          .take(perPage)
          .getMany();
      } else {
        user_devices = await this.userDeviceRepository
          .createQueryBuilder('user_devices')
          .leftJoinAndSelect('user_devices.devices', 'devices')
          .leftJoinAndSelect('user_devices.user', 'user')
          .select([
            'user_devices._id',
            'user_devices.is_on',
            'user_devices.local',
            'user_devices.room',
            'devices._id',
            'devices.name',
            'devices.type',
            'user._id',
          ])
          .where(
            'user_devices.user = :userId and user_devices.local = :local',
            { userId, local },
          )
          .skip((pages - 1) * perPage)
          .take(perPage)
          .getMany();
      }
      if (!user_devices) {
        throw new NotFoundException('No user_devices found');
      }
      return user_devices;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async delete(id: number): Promise<any> {
    try {
      const userDevice = await this.userDeviceRepository.findOne({
        where: { _id: id },
      });
      if (!userDevice) {
        throw new NotFoundException('User device not found');
      }
      await this.userDeviceRepository.delete({ _id: id });
      return { message: 'Deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
// legado
// Versão 2.0
// async getUserDevices(req: any, local: any): Promise<UserDevice[]> {
//   try {
//     const regexCasa = /^casa$/i;
//     const regexEscritorio = /^escrit[óo]rio$/i;
//     const regexFabrica = /^f[áa]brica$/i;

//     if (regexCasa.test(local)) {
//       local = LocalRole.CASA;
//     } else if (regexEscritorio.test(local)) {
//       local = LocalRole.Escritório;
//     } else if (regexFabrica.test(local)) {
//       local = LocalRole.Fábrica;
//     }

//     const userId = req.user.id;
//     let user_devices: UserDevice[];
//     if (local === null || local === undefined) {
//       user_devices = await this.userDeviceRepository
//         .createQueryBuilder('user_devices')
//         .leftJoinAndSelect('user_devices.devices', 'devices')
//         .leftJoinAndSelect('user_devices.user', 'user')
//         .select([
//           'user_devices._id',
//           'user_devices.is_on',
//           'user_devices.local',
//           'user_devices.room',
//           'devices._id',
//           'devices.name',
//           'devices.type',
//           'user._id',
//         ])
//         .where('user_devices.user = :userId', { userId })
//         .getMany();
//     } else {
//       user_devices = await this.userDeviceRepository
//         .createQueryBuilder('user_devices')
//         // .leftJoinAndSelect('user_devices.devices', 'devices')
//         // .innerJoinAndSelect('user_devices.devices', 'devices', 'users')
//         .leftJoinAndSelect('user_devices.devices', 'devices')
//         .leftJoinAndSelect('user_devices.user', 'user')
//         .select([
//           'user_devices._id',
//           'user_devices.is_on',
//           'user_devices.local',
//           'user_devices.room',
//           'devices._id',
//           'devices.name',
//           'devices.type',
//           'user._id',
//         ])
//         .where(
//           'user_devices.user = :userId and user_devices.local = :local',
//           { userId, local },
//         )
//         .getMany();
//     }
//     if (!user_devices) {
//       throw new NotFoundException('No user_devices found');
//     }
//     return user_devices;
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }

// Versão 1.0
// async getUserDevices(req: any, local: any): Promise<UserDevice[]> { // legado
//   try {
//     const regexCasa = /^casa$/i;
//     const regexEscritorio = /^escrit[óo]rio$/i;
//     const regexFabrica = /^f[áa]brica$/i;

//     if (regexCasa.test(local)) {
//       local = LocalRole.CASA;
//     } else if (regexEscritorio.test(local)) {
//       local = LocalRole.Escritório;
//     } else if (regexFabrica.test(local)) {
//       local = LocalRole.Fábrica;
//     }

//     const userId = req.user.id;
//     console.log('userId: ', userId);
//     let user_devices: UserDevice[];
//     if (local === null) {
//       console.log('Primeiro IF Chegou');
//       user_devices = await this.userDeviceRepository.find({
//         select: ['_id', 'is_on', 'local', 'room'],
//         where: {
//           user: Equal(userId),
//         },
//         relations: ['user', 'devices'],
//       });
//     } else {
//       user_devices = await this.userDeviceRepository.find({
//         select: ['_id', 'is_on', 'local', 'room'],
//         where: { user: Equal(userId), local: local },
//         relations: ['user', 'devices'],
//       });
//     }
//     if (!user_devices) {
//       throw new NotFoundException('No user_devices found');
//     }
//     return user_devices;
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
