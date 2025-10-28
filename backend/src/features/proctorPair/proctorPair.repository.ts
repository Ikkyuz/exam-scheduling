import prisma from "@/providers/database/database.provider";
import { ProctorPairCreateUpdate } from "./proctorPair.schema";

export namespace ProctorPairRepository {
  export async function createMany(proctorPairs: ProctorPairCreateUpdate[]) {
    const now = new Date();

    // ✅ ตรวจสอบแต่ละ pair ว่ามี teacher_id 2 คนพอดี
    for (const pair of proctorPairs) {
      if (pair.teacher_ids.length !== 2)
        throw new Error(`Each ProctorPair must have exactly 2 teacher IDs.`);

      // ตรวจสอบว่าครูมีอยู่จริง
      const found = await prisma.teacher.findMany({
        where: { id: { in: pair.teacher_ids } },
      });
      if (found.length !== 2)
        throw new Error(
          `Some teacher IDs not found: ${pair.teacher_ids.join(", ")}`
        );
    }

    // ✅ สร้าง pair ทีละอัน เพราะต้องเชื่อม many-to-many
    const createdPairs = [];
    for (const pair of proctorPairs) {
      const created = await prisma.proctorPair.create({
        data: {
          teachers: {
            connect: pair.teacher_ids.map((id) => ({ id })),
          },
          createdAt: now,
        },
        include: { teachers: true },
      });
      createdPairs.push(created);
    }

    return createdPairs;
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.proctorPair.findMany({
      include: {
        teachers: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(proctorPairId: string) {
    return await prisma.proctorPair.findUnique({
      where: { id: proctorPairId },
      include: {
        teachers: true,
      },
    });
  }

  export async function update(
    id: string,
    data: Partial<ProctorPairCreateUpdate>
  ) {
    // ตรวจสอบจำนวนครูที่อัปเดตใหม่
    if (data.teacher_ids && data.teacher_ids.length > 2) {
      throw new Error("A ProctorPair cannot have more than 2 teachers.");
    }

    // สร้าง object สำหรับ update
    const updateData: any = {};

    if (data.teacher_ids) {
      updateData.teachers = {
        set: data.teacher_ids.map((id) => ({ id })),
      };
    }

    const updated = await prisma.proctorPair.update({
      where: { id },
      data: updateData, // <-- ใช้ object ที่ optional
      include: { teachers: true },
    });

    return updated;
  }

  export async function deleteById(id: string) {
    return prisma.proctorPair.delete({
      where: { id },
      include: { teachers: true },
    });
  }

  export async function deleteAll() {
    return prisma.proctorPair.deleteMany();
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          teachers: {
            some: {
              id: { contains: search }, // หรือ name: { contains: search } ถ้าต้องการค้นหาชื่อครู
            },
          },
        }
      : {};

    return await prisma.proctorPair.count({ where });
  }
}
