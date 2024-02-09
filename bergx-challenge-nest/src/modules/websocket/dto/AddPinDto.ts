import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddPinDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(1000)
  description?: string;
}
