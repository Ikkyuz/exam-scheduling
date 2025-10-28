import prisma from "@/providers/database/database.provider";
import { RoomCreateUpdate } from "./room.schema";

export namespace RoomRepository {
  export async function createMany(rooms: RoomCreateUpdate[]) {
    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const roomsWithTime = rooms.map((r) => ({ ...r, createdAt: now }));

    // bulk insert
    await prisma.room.createMany({
      data: roomsWithTime,
    });

    // query objects ใหม่
    return prisma.room.findMany({
      where: { createdAt: now },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.room.findMany({
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(id: string) {
    return await prisma.room.findUnique({
      where: { id: id },
    });
  }

  export async function update(id: string, room: Partial<RoomCreateUpdate>) {
    return prisma.room.update({
      where: { id: id },
      data: room,
    });
  }

  export async function deleteAll() {
    return prisma.room.deleteMany({});
  }

  export async function deleteById(id: string) {
    return prisma.room.delete({
      where: { id: id },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          roomNumber: { contains: search },
          building: { contains: search },
        }
      : {};
    return prisma.room.count({ where });
  }
}
