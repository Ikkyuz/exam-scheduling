import prisma from "@/providers/database/database.provider";
import { CourseGroupCreateUpdate } from "./courseGroup.schema";

export namespace CourseGroupRepository {
  export async function createMany(courseGroups: CourseGroupCreateUpdate[]) {
    // ตรวจสอบว่า course_id มีอยู่จริง
    for (const cg of courseGroups) {
      const course = await prisma.course.findUnique({
        where: { id: cg.course_id },
      });
      if (!course) throw new Error(`Course with id ${cg.course_id} not found`);
    }

    // ใส่ timestamp ชั่วคราว เพื่อ query objects ที่สร้างใหม่
    const now = new Date();
    const courseGroupsWithTime = courseGroups.map((cg) => ({
      ...cg,
      createdAt: now,
    }));

    // bulk insert
    await prisma.courseGroup.createMany({
      data: courseGroupsWithTime,
    });

    // query objects ที่สร้างใหม่ พร้อม relation course
    return prisma.courseGroup.findMany({
      where: { createdAt: now },
      include: { course: true },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.courseGroup.findMany({
      include: { course: true },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function countAll(search?: string) {
    const where = search ? { course_id: { contains: search } } : {};
    return prisma.courseGroup.count({ where });
  }

  export async function findById(id: string) {
    return await prisma.courseGroup.findMany({ where: { id }, include: { course: true } });
  }

  export async function update(
    id: string,
    data: Partial<CourseGroupCreateUpdate>
  ) {
    return await prisma.courseGroup.update({ where: { id }, data });
  }

  export async function deleteAll() {
    return await prisma.courseGroup.deleteMany();
  }

  export async function deleteById(id: string) {
    return await prisma.courseGroup.delete({ where: { id } });
  }
}
