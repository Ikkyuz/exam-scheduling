import { CourseGroupCreateUpdate } from "./courseGroup.schema";
import { CourseGroupRepository } from "./courseGroup.repository";
import { CourseRepository } from "../course/course.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace CourseGroupService {
  export async function createMany(data: CourseGroupCreateUpdate[]) {
    return await CourseGroupRepository.createMany(data);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search ?? "";

    const { skip, take } = getPaginationParams(page, itemsPerPage);

    // ดึงข้อมูลจาก repository
    const rawData = await CourseGroupRepository.findAll({ skip, take, search });
    const total = await CourseGroupRepository.countAll(search);

    // แก้ไข data ให้ตรง schema: course เป็น array
    const data = rawData.map((item) => ({
      ...item,
      course: [item.course], // <-- แก้ไขตรงนี้: wrap object เป็น array
      examType: item.course.examType as "InSchedule" | "OutSchedule", // <-- cast ให้ตรง union
    }));

    const totalPages = Math.ceil(total / itemsPerPage);
    const nextPage = page < totalPages;
    const previousPage = page > 1;

    return {
      data,
      meta_data: {
        page,
        itemsPerPage,
        total,
        totalPages,
        nextPage,
        previousPage,
      },
    };
  }

  export async function findById(id: string) {
    return await CourseGroupRepository.findById(id);
  }

  export async function update(
    id: string,
    data: Partial<CourseGroupCreateUpdate>
  ) {
    const existingCourse = await CourseRepository.findById(id);
    if (!existingCourse) {
      throw new Error("CourseGroup not found");
    }

    return await CourseGroupRepository.update(id, data);
  }

  export async function deleteAll() {
    return await CourseGroupRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await CourseGroupRepository.deleteById(id);
  }
}
