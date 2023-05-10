import { Body, Controller, Delete, Get, Ip, Param, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { EventDto } from "./dto/event.dto";
import { IdParam } from "./dto/idparam";
import { IpAddress } from "./decorators/ipAddress";

@ApiTags('events')
// @ApiCookieAuth()
@Controller()
export class EventController {
  constructor(private readonly service: EventService) {}
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({
    summary:"Get event by event ID",
  })
  @ApiResponse({
    status: 200,
    description: 'Event successfully received',
    type: EventDto
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found'
  })
  @Get('/api/events/:id')
  async getById(@Param() param: IdParam)  {
      return this.service.getById(param.id);
  }

  @ApiOperation({
    summary:"Get all events",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @Get('/api/events')
  // @UseGuards(new AuthGuard())
  async getAll() {
      return this.service.getAll();
    }


  @ApiOperation({
    summary:"Create a new event",
  })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
    type: EventDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @Post('/api/users')
  // @UseGuards(new AuthGuard())
  async add(@Body() body: EventDto, @IpAddress() ipAddress) {
      return this.service.add(body, ipAddress);
    }

  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({
    summary:"Delete event by event ID",
  })
  @ApiResponse({
    status: 200,
    description: 'Event successfully deleted'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request'
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found'
  })
  @Delete('/api/users/:id')
  // @UseGuards(new AuthGuard())
  async delete(@Param() param: IdParam) {
      return this.service.delete(param.id);
  }
}