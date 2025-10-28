import prisma from "@/providers/database/database.provider";
import { DepartmentCreateUpdate } from "./department.schema";

export namespace DepartmentRepository {
  export async function createMany(departments: DepartmentCreateUpdate[]) {
    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const departmentsWithTime = departments.map((d) => ({
      ...d,
      createdAt: now,
    }));

    // bulk insert
    await prisma.department.createMany({
      data: departmentsWithTime,
    });

    // query objects ใหม่ พร้อม relations (classes, teachers)
    return prisma.department.findMany({
      where: { createdAt: now },
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.department.findMany({
      include: {
        classes: true,
        teachers: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(departmentId: string) {
    return await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function update(
    departmentId: string,
    department: Partial<DepartmentCreateUpdate>
  ) {
    return prisma.department.update({
      where: { id: departmentId },
      data: department,
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function deleteAll() {
    return prisma.department.deleteMany();
  }

  export async function deleteById(departmentId: string) {
    return prisma.department.delete({
      where: { id: departmentId },
      include: {
        classes: true,
        teachers: true,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { name: { contains: search } } : {};
    return await prisma.department.count({ where });
  }
}
