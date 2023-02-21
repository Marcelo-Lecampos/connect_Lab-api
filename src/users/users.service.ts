import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { userAddress } from './entities/address.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AddressDTO } from './dto/address-user.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<userAddress>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findUserProfile(req) {
    const _id = req.user.id;
    const getUser = await this.userRepository.findOne({
      where: { _id },
    });
    return getUser;
  }

  async updateUser(
    _id: number,
    updateUser: UpdateUserDto,
  ): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          fullName,
          photoUrl,
          email,
          password,
          phone,
          userAddress,
          role,
        } = updateUser;
        const user = await this.userRepository.findOne({
          where: { _id },
        });
        if (!user) {
          reject(new Error('Usuário não encontrado'));
        }
        if (fullName) {
          user.fullName = fullName;
        }
        if (photoUrl) {
          user.photoUrl = photoUrl;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          user.salt = await bcrypt.genSalt(12);
          user.password = await this.hashPassword(password, user.salt);
        }
        if (phone) {
          user.phone = phone;
        }
        if (role) {
          user.role = role;
        }
        if (userAddress) {
          // user.userAddress = await this.updateAddress(address);
          user.userAddress = await this.updateAddress(
            user.userAddress._id,
            userAddress,
          );
        }
        const userUpdated = await this.userRepository.save(user);
        delete userUpdated.password;
        delete userUpdated.salt;
        resolve(userUpdated);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }
  async updateAddress(
    _id: number,
    address: UpdateAddressDTO,
  ): Promise<userAddress> {
    const { street, number, complement, city, state, zipCode } = address;
    const addressToUpdate = await this.addressRepository.findOne({
      where: { _id: _id },
    });
    if (!addressToUpdate) {
      throw new NotFoundException('Endereço não encontrado');
    }
    if (street) {
      addressToUpdate.street = street;
    }
    if (number) {
      addressToUpdate.number = number;
    }
    if (complement) {
      addressToUpdate.complement = complement;
    }
    if (city) {
      addressToUpdate.city = city;
    }
    if (state) {
      addressToUpdate.state = state;
    }
    if (zipCode) {
      addressToUpdate.zipCode = zipCode;
    }
    const addressUpdated = await this.addressRepository.save(addressToUpdate);
    return addressUpdated;
  }

  async deleteUser(_id: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({ where: { _id } });
        if (!user) {
          reject(new NotFoundException(`User with ID "${_id}" not found`));
        }
        await this.userRepository.delete(_id);

        resolve('User deleted successfully!');
      } catch (error) {
        reject(new InternalServerErrorException(error));
      }
    });
  }
}
