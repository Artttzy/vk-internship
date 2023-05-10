import { Controller } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('events')
// @ApiCookieAuth()
@Controller()
export class EventController {
  constructor(private readonly service: EventService) {
  }
}