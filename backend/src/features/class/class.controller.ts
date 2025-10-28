import Elysia, { t } from "elysia";
import {
  ClassCreateUpdateSchema,
  ClassWithRelationsSchema,
} from "./class.schema";
import { ClassService } from "./class.service";

export namespace ClassController {
  export const classController = new Elysia({ prefix: "/class" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const result = await ClassService.createMany(body);
          set.status = "Created";
          return {
            data: result, // array ของ Class objects พร้อม relations
            message: "Classes created successfully",
          };
        } catch (error: any) {
          if (error.message.includes("already exists")) {
            set.status = "Conflict";
            return { message: error.message };
          }
          set.status = "Internal Server Error";
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        body: t.Array(ClassCreateUpdateSchema),
        response: {
          201: t.Object({
            data: t.Array(ClassWithRelationsSchema), // ใช้ schema พร้อม relations
            message: t.String(),
          }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Classes"],
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
          const search = query.search ?? "";

          // เรียก service
          const result = await ClassService.findAll({
            page,
            itemsPerPage,
            search,
          });

          if (result.data.length === 0 && result.meta_data.total > 0) {
            set.status = "No Content"; // 204
            return { message: "No content for this page/query." };
          }

          // แปลงข้อมูลให้ตรง schema
          const transformed = {
            data: result.data.map((cls) => ({
              ...cls,
              // department ต้องเป็น array
              department: cls.department
                ? [{ id: cls.department.id, name: cls.department.name }]
                : [],
            })),
            meta_data: result.meta_data,
          };

          return transformed;
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
            data: t.Array(ClassWithRelationsSchema),
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
        tags: ["Classes"],
      }
    )

    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const result = await ClassService.findById(params.id);
          if (!result) {
            set.status = "Not Found";
            return { message: "Class not found" };
          }
          set.status = "OK";
          return result;
        } catch (error: any) {
          set.status = "Internal Server Error";
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: {
          200: ClassWithRelationsSchema,
          404: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() })
        },
        tags: ["Classes"],
      }
    )

    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const result = await ClassService.update(params.id, body);
          set.status = "OK";
          return result;
        } catch (error: any) {
          if (error.message === "Course not found") {
            set.status = "Not Found";
            return error.message;
          }
          set.status = "Internal Server Error";
          if ("message" in error) return error.message;
          return "Internal Server Error";
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: t.Partial(ClassCreateUpdateSchema),
        response: {
          200: t.Object({ data: ClassWithRelationsSchema }),
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["Classes"],
      }
    )

    .delete(
      "/",
      async ({ set }) => {
        try {
          await ClassService.deleteAll();
          set.status = "OK";
          return { message: "All classes deleted successfully" };
        } catch (error: any) {
          set.status = "Internal Server Error";
          if ("message" in error) return error.message;
          return "Internal Server Error";
        }
      },
      {
        response: {
          200: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Classes"],
      }
    )

    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deleteClass = await ClassService.deleteById(params.id);
          set.status = "OK";
          return {
            deletedClass: deleteClass,
            message: "Class deleted successfully",
          };
        } catch (error: any) {
          if (error.message === "Course not found") {
            set.status = "Not Found";
            return error.message;
          }
          set.status = "Internal Server Error";
          if ("message" in error) return error.message;
          return "Internal Server Error";
        }
      },
      {
        params: t.Object({ id: t.String() }),
        response: {
          200: t.Object({
            deletedClass: ClassWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["Classes"],
      }
    );
}
