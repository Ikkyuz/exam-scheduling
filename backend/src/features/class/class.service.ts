import { ClassCreateUpdate } from "./class.schema";
import { ClassRepository } from "./class.repository";
import { DepartmentRepository } from "../department/department.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace ClassService {
  export async function createMany(classes: ClassCreateUpdate[]) {
    return await ClassRepository.createMany(classes);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search ?? "";

    const { skip, take } = getPaginationParams(page, itemsPerPage);

    const data = await ClassRepository.findAll({ skip, take, search });
    const total = await ClassRepository.countAll(search);

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
    return await ClassRepository.findById(id);
  }

  export async function update(
    id: string,
    classData: Partial<ClassCreateUpdate>
  ) {
    const existingDepartment = await DepartmentRepository.findById(id);
    if (!existingDepartment) {
      throw new Error("Department not found");
    }

    return await ClassRepository.update(id, classData);
  }

  export async function deleteAll() {
    return await ClassRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await ClassRepository.deleteById(id);
  }
}
