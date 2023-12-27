import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'username',
    description: 'Username',
    example: 'username',
  })
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'password',
  })
  password: string;
}
