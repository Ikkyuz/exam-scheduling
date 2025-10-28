import prisma from "@/providers/database/database.provider";
import { CourseCreateUpdate } from "./course.schema";
import { ExamType } from "@/providers/database/generated/mysql/enums"; 

export namespace CourseRepository {
  export async function createMany(courses: CourseCreateUpdate[]) {
    // ใส่ timestamp ชั่วคราวเพื่อ query objects ใหม่
    const now = new Date();
    const coursesWithTime = courses.map((c) => ({ ...c, createdAt: now, examType: c.examType ?? ExamType.InSchedule }));

    // bulk insert
    await prisma.course.createMany({
      data: coursesWithTime,
    });

    // query objects ใหม่ พร้อม relations
    return prisma.course.findMany({
      where: { createdAt: now },
      include: {
        enrollments: true,
        courseGroups: true,
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    return prisma.course.findMany({
      include: {
        enrollments: {
          include: { class: true },
        },
        courseGroups: true,
      },
      take: options.take,
      skip: options.skip,
    });
  }

  export async function findById(courseId: string) {
    return await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enrollments: true,
        courseGroups: true,
      },
    });
  }

  export async function update(
    courseId: string,
    course: Partial<CourseCreateUpdate>
  ) {
    return prisma.course.update({
      where: { id: courseId },
      data: course,
      include: {
        enrollments: true,
        courseGroups: true,
      },
    });
  }

  export async function deleteAll() {
    return prisma.course.deleteMany({});
  }

  export async function deleteById(courseId: string) {
    return prisma.course.delete({
      where: { id: courseId },
      include: {
        enrollments: true,
        courseGroups: true,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          code: { contains: search },
          name: { contains: search },
        }
      : {};
    return prisma.course.count({ where });
  }
}
