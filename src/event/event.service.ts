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

  async getEventsCounter(body: FilterParam) {
    let date = new Date(body.date);
    const events = await prisma.event.findMany({
      select: {
        title: true,
      },
      where: {
        date: date
      },
      distinct: ['title']
    })
    if (!events) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    let titles = []
    events.forEach((event) => {
      titles.push(event.title)
    });
    let counts = []
    for (const title of titles) {
      const count = await prisma.event.count({
        where: {
          title: title
        },
      })
      const obj = {title: title, count: count};
      counts.push(obj);
    };
    let obj = {};
    counts.forEach(item => obj[item.title] = item.count);
    return JSON.stringify(obj);
  }

  async getIpCounter(body: FilterParam) {
    let title = body.title;
    let date = new Date(body.date);
    const events = await prisma.event.findMany({
      select: {
        ip: true,
      },
      where: {
        date: date,
        title: title
      },
      distinct: ['ip']
    })
    if (!events) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    let ips = []
    events.forEach((event) => {
      ips.push(event.ip)
    });
    let counts = []
    for (const ip of ips) {
      const count = await prisma.event.count({
        where: {
          ip: ip
        },
      })
      const obj = {ip: ip, count: count};
      counts.push(obj);
    };
    let obj = {};
    counts.forEach(item => obj[item.ip] = item.count);
    return JSON.stringify(obj);
  }

  async getStatusCounter(body: FilterParam) {
    let title = body.title;
    let date = new Date(body.date);

    let counts = []
    const count1 = await prisma.event.count({
        where: {
          title: title,
          date: date,
          status: true
        },
    });
    const obj1 = { status: "authorized", count: count1 };
    counts.push(obj1);
    const count0 = await prisma.event.count({
      where: {
        title: title,
        date: date,
        status: false
      },
    })
    const obj0 = { status: "unauthorized", count: count0 };
    counts.push(obj0);

    let obj = {};
    counts.forEach(item => obj[item.status] = item.count);
    return JSON.stringify(obj);
  }
}