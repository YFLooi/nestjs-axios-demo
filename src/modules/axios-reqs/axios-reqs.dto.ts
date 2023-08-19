import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class AddNewObjectDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the thing to add',
    example: 'AMD Ryzen 5',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'object',
    description: 'Properties of the object to add',
    example: JSON.stringify({
      year: 2020,
      price: 'MYR 200',
      maxClockSpeed: '2.35 GHz',
      cores: 5,
    }),
  })
  @IsObject()
  data: Record<string, any>;
}

export class UpdateExistingObjectDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the thing to add',
    example: 'AMD Ryzen 5',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'object',
    description: 'Properties of the object to add',
    example: JSON.stringify({
      year: 2020,
      price: 'MYR 200',
      maxClockSpeed: '2.35 GHz',
      cores: 5,
    }),
  })
  @IsObject()
  data: Record<string, any>;
}

export class PartiallyUpdateExistingObjectDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the thing to add',
    example: 'AMD Ryzen 5',
  })
  @IsString()
  name: string;
}
