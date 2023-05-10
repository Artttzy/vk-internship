import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { PrismaClient } from '@prisma/client';
import { FilterParam} from "./dto/filterParam";
import { async } from "rxjs";

const prisma = new PrismaClient()
export default prisma

@Injectable()
export class EventService {
  async add(body : EventDto, ipAddress) {
    let title = body.title;
    let status = body.status;
    let ip = ipAddress;
    try {
      const event = await prisma.event.create({
        data: {
          title,
          status,
          ip
        }
      })
      return event;
    }
    catch (e) {
      return e;
    }
  }

  async delete(id) {
    id = Number(id);
    const event = await prisma.event.delete({
      where: {
        id
      }
    });
  }

  async getById(id) {
    let num = Number(id);
    const event = await prisma.event.findUnique({
      where: {
        id : num
      },
    })
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }
  async getAll() {
    const events = await prisma.event.findMany();
    return events;
  }

  async getFiltered(body: FilterParam) {
    let title = body.title;
    let date = new Date(body.date);
    const event = await prisma.event.findMany({
      where: {
        title : title,
        date: date
      },
    })

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async getFilteredWithEventsCounter(body: FilterParam) {
    let date = new Date(body.date);
    const events = await prisma.event.findMany({
      where: {
        date: date
      },
    })
    if (!events) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    events.forEach((event) =>  async function(){
      const count = await prisma.event.count({
        where: {
          title: event.title
        },
      })

    });

    return events;
  }

  async getFilteredWithIpCounter(body: FilterParam) {
    let title = body.title;
    let date = new Date(body.date);
    const event = await prisma.event.findMany({
      where: {
        title : title,
        date: date
      },
    })

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async getFilteredWithStatusCounter(body: FilterParam) {
    let title = body.title;
    let date = new Date(body.date);
    const event = await prisma.event.findMany({
      where: {
        title : title,
        date: date
      },
    })

    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }
}