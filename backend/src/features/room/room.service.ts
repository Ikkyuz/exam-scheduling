import { RoomCreateUpdate } from "./room.schema";
import { RoomRepository } from "./room.repository";
import { getPaginationParams } from "../../shared/utils/pagination";

export namespace RoomService {
  export async function createMany(courses: RoomCreateUpdate[]) {
    return await RoomRepository.createMany(
      courses,
    );
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search; 

    const { skip, take } = getPaginationParams(page, itemsPerPage);
    const data = await RoomRepository.findAll({ skip, take, search });
    const total = await RoomRepository.countAll(search);

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
    return await RoomRepository.findById(id);
  }

  export async function update(
    id: string,
    course: RoomCreateUpdate
  ) {
    return await RoomRepository.update(id, course);
  }

  export async function deleteById(id: string) {
    return await RoomRepository.deleteById(id);
  }

  export async function deleteAll() {
    return await RoomRepository.deleteAll();
  }
}
