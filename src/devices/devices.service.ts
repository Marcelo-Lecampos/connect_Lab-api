import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './entities/device.entity';
import { Info } from './entities/info.entity';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICES_REPOSITORY')
    private DeviceRepository: Repository<Device>,
    @Inject('INFO_REPOSITORY')
    private DeviceInfoRepository: Repository<Info>,
  ) {}

  createDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = this.DeviceRepository.create(createDeviceDto);
        const savedDevice = await this.DeviceRepository.save(device);
        resolve(savedDevice);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(): Promise<Device[]> {
    try {
      return await this.DeviceRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findOne(_id: number) {
    const getDevice = this.DeviceRepository.findOne({
      where: { _id },
      relations: ['info'],
    });
    return getDevice;
  }
}
