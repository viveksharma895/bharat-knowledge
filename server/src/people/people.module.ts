import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { AdminPeopleController } from './admin-people.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
    ]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PeopleController, AdminPeopleController],
  providers: [PeopleService],
  exports: [PeopleService],
})
export class PeopleModule {}
