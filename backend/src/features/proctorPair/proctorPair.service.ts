import { ProctorPairCreateUpdate } from "./proctorPair.schema";
import { ProctorPairRepository } from "./proctorPair.repository";
import { TeacherRepository } from "../teacher/teacher.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace ProctorPairService {
  export async function createMany(data: ProctorPairCreateUpdate[]) {
    return await ProctorPairRepository.createMany(data);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search ?? "";

    const { skip, take } = getPaginationParams(page, itemsPerPage);

    // ดึงข้อมูลจาก repository
    const data = await ProctorPairRepository.findAll({ skip, take, search });
    const total = await ProctorPairRepository.countAll(search);

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
    return await ProctorPairRepository.findById(id);
  }

  export async function update(
    id: string,
    data: Partial<ProctorPairCreateUpdate>
  ) {
    const existingteacher = await TeacherRepository.findById(id);
    if (!existingteacher) {
      throw new Error("teacherGroup not found");
    }

    return await ProctorPairRepository.update(id, data);
  }

  export async function deleteAll() {
    return await ProctorPairRepository.deleteAll();
  }

  export async function deleteById(id: string) {
    return await ProctorPairRepository.deleteById(id);
  }
}
