import prisma from "@/providers/database/database.provider";
import { ClassCreateUpdate } from "./class.schema";
import { Level } from "@/providers/database/generated/mysql/enums"; 

export namespace ClassRepository {
  export async function createMany(classes: ClassCreateUpdate[]) {
    // ตรวจสอบว่า department_id มีอยู่จริง
    for (const classData of classes) {
      const department = await prisma.department.findUnique({
        where: { id: classData.department_id },
      });
      if (!department)
        throw new Error(
          `Department with id ${classData.department_id} not found`
        );
    }

    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const classesWithTime = classes.map((c) => ({ ...c, createdAt: now, level: c.level ?? Level.Pvoc }));

    // bulk insert
    await prisma.class.createMany({ data: classesWithTime });

    // query objects ใหม่ พร้อม relation department (และ enrollments ถ้าต้องการ)
    return prisma.class.findMany({
      where: { createdAt: now },
      include: {
        department: true, // คืนค่า department
        enrollments: true, // คืนค่า enrollments
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.class.findMany({
      include: { department: true, enrollments: true },
      skip: options.skip,
      take: options.take,
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { department_id: { contains: search } } : {};
    return prisma.class.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.class.findUnique({ where: { id }, include: { department: true, enrollments: true } });
  }

  export async function update(
    id: string,
    classData: Partial<ClassCreateUpdate>
  ) {
    const department = await prisma.department.findUnique({
      where: { id: classData.department_id },
    });

    if (!department) {
      throw new Error(
        `Department with id ${classData.department_id} not found`
      );
    }

    return await prisma.class.update({ where: { id }, data: classData });
  }

  export async function deleteAll() {
    return await prisma.class.deleteMany({ where: {} });
  }

  export async function deleteById(id: string) {
    return await prisma.class.delete({ where: { id } });
  }
}
