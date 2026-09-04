import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { PersonStatus } from '../schemas/person.schema';

class PersonImageDto {
  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ example: 'Portrait of the person' })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiPropertyOptional({ example: 'Official portrait' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ example: 'CC BY 4.0' })
  @IsOptional()
  @IsString()
  license?: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional()
  @IsString()
  source?: string;
}

class CategoryRefDto {
  @ApiProperty({ example: 'politics' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Politics' })
  @IsOptional()
  @IsString()
  label?: string;
}

export class CreatePersonDto {
  @ApiProperty({ example: 'Sachin Tendulkar', description: 'Full name of the person' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'sachin-tendulkar', description: 'Unique URL-friendly slug' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: ['The Little Master', 'Master Blaster'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @ApiPropertyOptional({ example: 'Former Indian cricketer widely regarded as one of the greatest batsmen.', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  shortBio?: string;

  @ApiPropertyOptional({ example: 'Sachin Ramesh Tendulkar is a former Indian international cricketer...' })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiPropertyOptional({ example: '1973-04-24' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  dateOfDeath?: string;

  @ApiPropertyOptional({ example: 'Mumbai, India' })
  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @ApiPropertyOptional({ example: ['Indian'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nationality?: string[];

  @ApiPropertyOptional({ example: ['Cricketer', 'Sports Administrator'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  occupations?: string[];

  @ApiPropertyOptional({ type: [CategoryRefDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryRefDto)
  categories?: CategoryRefDto[];

  @ApiPropertyOptional({ type: PersonImageDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonImageDto)
  image?: PersonImageDto;

  @ApiPropertyOptional({ enum: PersonStatus, default: PersonStatus.DRAFT })
  @IsOptional()
  @IsEnum(PersonStatus)
  status?: PersonStatus;
}
