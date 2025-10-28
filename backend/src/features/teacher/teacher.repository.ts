import prisma from "@/providers/database/database.provider";
import { TeacherCreateUpdate } from "./teacher.schema";

export namespace TeacherRepository {
  export async function createMany(teachers: TeacherCreateUpdate[]) {
    // ตรวจสอบว่า department_id มีอยู่จริง
    for (const teacher of teachers) {
      const department = await prisma.department.findUnique({
        where: { id: teacher.department_id },
      });
      if (!department)
        throw new Error(
          `Department with id ${teacher.department_id} not found`
        );
    }

    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const teachersWithTime = teachers.map((t) => ({ ...t, createdAt: now }));

    // bulk insert
    await prisma.teacher.createMany({
      data: teachersWithTime,
    });

    // query objects ใหม่ พร้อม relation department และ proctorPairs
    return prisma.teacher.findMany({
      where: { createdAt: now },
      include: {
        department: true,
        proctorPairs: true,
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.teacher.findMany({
      include: {
        department: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(teacherId: string) {
    return await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        department: true,
      },
    });
  }

  export async function update(
    teacherId: string,
    teacher: Partial<TeacherCreateUpdate>
  ) {
    // ตรวจสอบ Foreign Key หากมีการส่ง department_id มาอัปเดต
    if (teacher.department_id) {
      const department = await prisma.department.findUnique({
        where: { id: teacher.department_id },
      });
      if (!department) {
        throw new Error(
          `Department with id ${teacher.department_id} not found`
        );
      }
    }

    return prisma.teacher.update({
      where: { id: teacherId },
      data: teacher,
      include: {
        department: true,
      },
    });
  }

  export async function deleteAll() {
    return prisma.teacher.deleteMany();
  }

  export async function deleteById(teacherId: string) {
    return prisma.teacher.delete({
      where: { id: teacherId },
      include: {
        department: true,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          name: { contains: search },
          tel: { contains: search },
          department: {
            name: { contains: search },
          },
        }
      : {};
    return prisma.teacher.count({ where });
  }
}
