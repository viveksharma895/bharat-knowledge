import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PersonStatus } from '../schemas/person.schema';

export class QueryPeopleDto {
  @ApiPropertyOptional({ default: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Search term to filter by name or aliases' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: PersonStatus, description: 'Filter by person status' })
  @IsOptional()
  @IsEnum(PersonStatus)
  status?: PersonStatus;
}
