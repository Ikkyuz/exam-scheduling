import { TeacherRepository } from "@/features/teacher/teacher.repository";
import { TeacherCreateUpdate } from "./teacher.schema";
import { getPaginationParams } from "@/shared/utils/pagination";
import { DepartmentRepository } from "../department/department.repository";

export namespace TeacherService {
  export async function createMany(teachers: TeacherCreateUpdate[]) {
    for (const teacher of teachers) {
      if (!teacher.name || teacher.name.trim() === "") {
        throw new Error("Teacher name is required.");
      }
    }
    return TeacherRepository.createMany(teachers);
  }

  export async function findAll(
    options: { page?: number; itemsPerPage?: number; search?: string } = {}
  ) {
    const page = options.page ?? 1;
    const itemsPerPage = options.itemsPerPage ?? 10;
    const search = options.search;

    const { skip, take } = getPaginationParams(page, itemsPerPage);
    const teachers = await TeacherRepository.findAll({ skip, take, search });
    const total = await TeacherRepository.countAll(search);

    const totalPages = Math.ceil(total / itemsPerPage);
    const nextPage = page < totalPages;
    const previousPage = page > 1;

    return {
      data: teachers,
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

  export async function findById(teacherId: string) {
    const teacher = await TeacherRepository.findById(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return teacher;
  }

  export async function update(
  teacherId: string,
  teacher: Partial<TeacherCreateUpdate>
) {
  const existingTeacher = await TeacherRepository.findById(teacherId);
  if (!existingTeacher) {
    throw new Error("Teacher not found");
  }

  // ตรวจสอบ foreign key หากส่ง department_id มา
  if (teacher.department_id) {
    const department = await DepartmentRepository.findById(teacher.department_id);
    if (!department) {
      throw new Error(`Department with id ${teacher.department_id} not found`);
    }
  }

  return TeacherRepository.update(teacherId, teacher);
}


  export async function deleteAll() {
    return TeacherRepository.deleteAll();
  }

  export async function deleteById(teacherId: string) {
    const existingTeacher = await TeacherRepository.findById(teacherId);
    if (!existingTeacher) {
      throw new Error("Teacher not found");
    }
    return TeacherRepository.deleteById(teacherId);
  }
}
