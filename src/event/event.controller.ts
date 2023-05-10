import { Body, Controller, Delete, Get, Ip, Param, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { EventDto } from "./dto/event.dto";
import { IdParam } from "./dto/idparam";
import { IpAddress } from "./decorators/ipAddress";
import { RealIP } from "nestjs-real-ip";
import { FilterParam } from "./dto/filterParam";


@Controller()
export class EventController {
  constructor(private readonly service: EventService) {}

  @ApiTags('events')
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

  @ApiTags('events')
  @ApiOperation({
    summary:"Get all events",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @Get('/api/events')
  async getAll() {
      return this.service.getAll();
    }

  @ApiTags('events')
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
  async add(@Body() body: EventDto, @RealIP() ip: string) {
      return this.service.add(body, ip);
    }

  @ApiTags('events')
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
  @Delete('/api/events/:id')
  async delete(@Param() param: IdParam) {
      return this.service.delete(param.id);
  }


  // FILTERS


  @ApiTags('filters')
  @ApiOperation({
    summary:"Get events filtered by date/title",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @ApiResponse({
    status: 404,
    description: 'Events not found'
  })
  @Post('/api/events/filtered')
  async getEventsFiltered(@Body() body: FilterParam) {
    return this.service.getFiltered(body);
  }

  @ApiTags('filters')
  @ApiOperation({
    summary:"Get events counter",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @ApiResponse({
    status: 404,
    description: 'Events not found'
  })
  @Post('/api/events/filtered/eventsCounter')
  async getEventsCounter(@Body() body: FilterParam) {
    return this.service.getEventsCounter(body);
  }

  @ApiTags('filters')
  @ApiOperation({
    summary:"Get ip counter",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @ApiResponse({
    status: 404,
    description: 'Events not found'
  })
  @Post('/api/events/filtered/ipCounter')
  async getIpCounter(@Body() body: FilterParam) {
    return this.service.getIpCounter(body);
  }

  @ApiTags('filters')
  @ApiOperation({
    summary:"Get status counter",
  })
  @ApiResponse({
    status: 200,
    description: 'Events successfully received',
    type: EventDto
  })
  @ApiResponse({
    status: 404,
    description: 'Events not found'
  })
  @Post('/api/events/filtered/statusCounter')
  async getStatusCounter(@Body() body: FilterParam) {
    return this.service.getStatusCounter(body);
  }
}