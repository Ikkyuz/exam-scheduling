import Elysia, { t } from "elysia";
import {
  TeacherCreateUpdateSchema,
  TeacherWithRelationsSchema,
} from "../teacher/teacher.schema";
import { TeacherService } from "../teacher/teacher.service";

export namespace TeacherController {
  export const teacherController = new Elysia({ prefix: "/teachers" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const newTeacher = await TeacherService.createMany(body);
          set.status = 201;
          return {
            newTeacher, // array ของ Teacher objects พร้อม relations
            message: "Teacher created successfully",
          };
        } catch (error: any) {
          if (error.message.includes("Bad Request")) {
            set.status = 400;
            return { message: error.message };
          }
          if (error.message.includes("already exists")) {
            set.status = 409;
            return { message: error.message };
          }
          set.status = 500;
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        body: t.Array(TeacherCreateUpdateSchema),
        response: {
          201: t.Object({
            newTeacher: t.Array(TeacherWithRelationsSchema), // ใช้ schema พร้อม relations
            message: t.String(),
          }),
          400: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    )

    .get(
      "/",
      async ({ query, set }) => {
        try {
          const page = query.page ? Number(query.page) : 1;
          const itemsPerPage = query.itemsPerPage
            ? Number(query.itemsPerPage)
            : 10;
          const search = query.search;

          const result = await TeacherService.findAll({
            page,
            itemsPerPage,
            search,
          });

          if (result.data.length === 0 && result.meta_data.total > 0) {
            set.status = "No Content"; // 204
            return { message: "No content for this page/query." };
          }

          return result;
        } catch (error: any) {
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        query: t.Object({
          page: t.Optional(t.Numeric()),
          itemsPerPage: t.Optional(t.Numeric()),
          search: t.Optional(t.String()),
        }),
        response: {
          200: t.Object({
            data: t.Array(TeacherWithRelationsSchema),
            meta_data: t.Object({
              page: t.Number(),
              itemsPerPage: t.Number(),
              total: t.Number(),
              totalPages: t.Number(),
              nextPage: t.Boolean(),
              previousPage: t.Boolean(),
            }),
          }),
          204: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    )
    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const teacher = await TeacherService.findById(params.id);
          return teacher;
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: {
          200: TeacherWithRelationsSchema,
          404: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    )
    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const updatedTeacher = await TeacherService.update(params.id, body);
          set.status = "OK"; // 200
          return { updatedTeacher, message: "Teacher updated successfully" };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (error.message.includes("already exists")) {
            set.status = "Conflict"; // 409
            return { message: error.message };
          }
          if (error.message.includes("Bad Request")) {
            set.status = "Bad Request"; // 400
            return { message: error.message };
          }
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: t.Partial(TeacherCreateUpdateSchema),
        response: {
          200: t.Object({
            updatedTeacher: TeacherWithRelationsSchema,
            message: t.String(),
          }),
          400: t.Object({ message: t.String() }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    )
    .delete(
      "/",
      async ({ set }) => {
        try {
          await TeacherService.deleteAll();
          set.status = "OK"; // 200
          return { message: "Teachers deleted successfully" };
        } catch (error: any) {
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        response: {
          200: t.Object({
            message: t.String(),
          }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    )
    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deletedTeacher = await TeacherService.deleteById(params.id);
          set.status = "OK"; // 200
          return { deletedTeacher, message: "Teacher deleted successfully" };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (
            error.message.includes(
              "Cannot delete teacher because it has related records"
            )
          ) {
            set.status = "Conflict"; // 409
            return { message: error.message };
          }
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: {
          200: t.Object({
            deletedTeacher: TeacherWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Teachers"],
      }
    );
}
