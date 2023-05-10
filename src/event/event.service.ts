import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export default prisma

@Injectable()
export class EventService {
  async add(body : EventDto, ipAddress) {
    let title = body.title;
    let status = body.status;
    let ip = "192.168.0.0";
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
}