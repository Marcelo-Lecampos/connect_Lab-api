import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { userAddress } from 'src/users/entities/address.entity';
import { AddressDTO } from 'src/users/dto/address-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { checkPassDTO } from 'src/users/dto/checkPass.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<userAddress>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.createUser(createUserDto);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  createUser(createUser: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          email,
          fullName,
          password,
          phone,
          photoUrl,
          userAddress,
          role,
        } = createUser;
        const user = this.userRepository.create();
        photoUrl.length > 0
          ? (user.photoUrl = photoUrl)
          : (user.photoUrl =
              'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1672968367~exp=1672968967~hmac=91cb309ab22f9ca5bc79c41328b036cc7d03703c714fde61f117ce1a4cdd0693');
        user.email = email;
        user.fullName = fullName;
        user.phone = phone;
        user.salt = await bcrypt.genSalt(12);
        user.password = await this.hashPassword(password, user.salt);
        user.userAddress = await this.createAddress(userAddress);
        user.role = role;
        const userCreated = await this.userRepository.save(user);
        delete userCreated.password;
        delete user.salt;

        resolve(user);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  async createAddress(address: AddressDTO): Promise<userAddress> {
    const addressCreated = this.addressRepository.create();
    addressCreated.street = address.street;
    addressCreated.number = address.number;
    addressCreated.complement = address.complement;
    addressCreated.neighborhood = address.neighborhood;
    addressCreated.city = address.city;
    addressCreated.state = address.state;
    addressCreated.zipCode = address.zipCode;
    return addressCreated;
  }

  async signIn(credentials: CredentialsDTO) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }
    const nameArray = user.fullName.split(' ');
    const firstName = nameArray[0];
    const jwtPayload: JwtPayloadUser = {
      id: user._id,
      firstName: firstName,
      email: user.email,
      url: user.photoUrl,
      role: user.role,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token, user };
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  async changePassword(checkPass: checkPassDTO) {
    const { email, oldPassword, newPassword, newPasswordConfirm } = checkPass;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user === null) {
      throw new UnauthorizedException('E-mail incorreto');
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Senha antiga incorreta');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new UnauthorizedException('Senhas novas não são iguais');
    }
    user.salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, user.salt);
    await this.userRepository.save(user);
    return 'Senha alterada com sucesso';
  }
}
