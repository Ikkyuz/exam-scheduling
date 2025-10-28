import prisma from "@/providers/database/database.provider";
import { EnrollmentCreateUpdate } from "./enrollment.schema";

export namespace EnrollmentRepository {
  export async function createMany(enrollments: EnrollmentCreateUpdate[]) {
    // ตรวจสอบว่า course_id และ class_id มีอยู่จริง
    for (const enrollment of enrollments) {
      const course = await prisma.course.findUnique({
        where: { id: enrollment.course_id },
      });
      if (!course)
        throw new Error(`Course with id ${enrollment.course_id} not found`);

      const classed = await prisma.class.findUnique({
        where: { id: enrollment.class_id },
      });
      if (!classed)
        throw new Error(`Class with id ${enrollment.class_id} not found`);
    }

    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const enrollmentsWithTime = enrollments.map((e) => ({
      ...e,
      createdAt: now,
    }));

    // bulk insert
    await prisma.enrollment.createMany({
      data: enrollmentsWithTime,
    });

    // query objects ใหม่ พร้อม relations
    return prisma.enrollment.findMany({
      where: { createdAt: now },
      include: {
        class: true,
        course: true,
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.enrollment.findMany({
      include: { course: true, class: true },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? { course_id: { contains: search }, classId: { contains: search } }
      : {};
    return prisma.enrollment.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.enrollment.findMany({ where: { id }, include: { course: true, class: true } });
  }

  export async function update(
    id: string,
    data: Partial<EnrollmentCreateUpdate>
  ) {
    return await prisma.enrollment.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.enrollment.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.enrollment.delete({ where: { id } });
  }
}
