import { PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  // All fields are inherited from CreatePersonDto and made optional.
  // Immutable fields (_id, createdAt, updatedAt) are not included
  // as they are not part of CreatePersonDto.
}
