import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { checkPassDTO } from 'src/users/dto/checkPass.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.signUp(createUserDto);
      return {
        message: 'Sucesso',
      };
    } catch (error) {
      if (error.code == 23505) {
        throw new HttpException({ reason: error.detail }, HttpStatus.CONFLICT);
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async signIn(@Body() credentialsDTO: CredentialsDTO) {
    try {
      const token = await this.authService.signIn(credentialsDTO);
      return token;
    } catch (error) {
      throw new HttpException(
        {
          reason: 'Credenciais inválidas',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changepassword')
  async changePassword(@Body() checkPass: checkPassDTO) {
    return await this.authService.changePassword(checkPass);
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  async me(@Param('id') id: string, @Request() req) {
    const user = req.params.id;
    return user;
  }
}
