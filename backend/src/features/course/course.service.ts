import { CourseCreateUpdate } from "./course.schema";
import { CourseRepository } from "./course.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace CourseService {
  export async function createMany(courses: CourseCreateUpdate[]) {
    return await CourseRepository.createMany(courses);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search;

    const { skip, take } = getPaginationParams(page, itemsPerPage);
    const data = await CourseRepository.findAll({ skip, take, search });
    const total = await CourseRepository.countAll(search);

    const totalPages = ((total + itemsPerPage - 1) / itemsPerPage) >> 0;
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
    return await CourseRepository.findById(id);
  }

  export async function update(
    id: string,
    course: CourseCreateUpdate
  ) {
    return await CourseRepository.update(id, course);
  }

  export async function deleteById(id: string) {
    return await CourseRepository.deleteById(id);
  }

  export async function deleteAll() {
    return await CourseRepository.deleteAll();
  }
}
