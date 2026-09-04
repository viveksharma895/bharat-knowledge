import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PeopleService } from '../people/people.service';
import { CreatePersonDto } from '../people/dto/create-person.dto';
import { UpdatePersonDto } from '../people/dto/update-person.dto';
import { QueryPeopleDto } from '../people/dto/query-people.dto';
import { ParseObjectIdPipe } from '../people/pipes/parse-object-id.pipe';

@ApiTags('Admin People')
@Controller('admin/people')
@UseGuards(JwtAuthGuard)
export class AdminPeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiOperation({ summary: 'List all people (admin - all statuses)' })
  @ApiOkResponse({ description: 'Paginated list of people' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async findAll(@Query() query: QueryPeopleDto) {
    const result = await this.peopleService.findAll(query);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiCreatedResponse({ description: 'Person created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiConflictResponse({ description: 'A person with this slug already exists' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  async create(@Body() createPersonDto: CreatePersonDto) {
    const person = await this.peopleService.create(createPersonDto);
    return {
      success: true,
      message: 'Person created successfully',
      data: person,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a person by ID' })
  @ApiOkResponse({ description: 'Person updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input or ID' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  @ApiConflictResponse({ description: 'A person with this slug already exists' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the person' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    const person = await this.peopleService.update(id, updatePersonDto);
    return {
      success: true,
      message: 'Person updated successfully',
      data: person,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a person by ID' })
  @ApiOkResponse({ description: 'Person deleted successfully' })
  @ApiNotFoundResponse({ description: 'Person not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Not authenticated' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the person' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    await this.peopleService.remove(id);
    return {
      success: true,
      message: 'Person deleted successfully',
    };
  }
}
