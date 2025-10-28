import { EnrollmentCreateUpdate } from "./enrollment.schema";
import { EnrollmentRepository } from "./enrollment.repository";
import { CourseRepository } from "../course/course.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace EnrollmentService {
  export async function createMany(data: EnrollmentCreateUpdate[]) {
    return await EnrollmentRepository.createMany(data);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search ?? "";

    const { skip, take } = getPaginationParams(page, itemsPerPage);

    // ดึงข้อมูลจาก repository
    const rawData = await EnrollmentRepository.findAll({ skip, take, search });
    const total = await EnrollmentRepository.countAll(search);

    const totalPages = Math.ceil(total / itemsPerPage);
    const nextPage = page < totalPages;
    const previousPage = page > 1;

    return {
      data: rawData,
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
    return await EnrollmentRepository.findById(id);
  }

  export async function update(
    id: string,
    data: Partial<EnrollmentCreateUpdate>
  ) {
    const existingCourse = await CourseRepository.findById(id);
    if (!existingCourse) {
      throw new Error("Course not found");
    }

    const existingClass = await CourseRepository.findById(id);
    if (!existingClass) {
      throw new Error("Class not found");
    }

    return await EnrollmentRepository.update(id, data);
  }

  export async function deleteAll() {
    return await EnrollmentRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await EnrollmentRepository.deleteById(id);
  }
}
