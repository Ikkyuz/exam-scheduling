import Elysia, { t } from "elysia";
import {
  DepartmentCreateUpdateSchema,
  DepartmentWithRelationsSchema,
} from "./department.schema";
import { DepartmentService } from "./department.service";

export namespace DepartmentController {
  export const departmentController = new Elysia({ prefix: "/departments" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const newDepartment = await DepartmentService.createMany(body);
          set.status = 201;
          return {
            newDepartment, // array ของ Department objects พร้อม relations
            message: "Department created successfully",
          };
        } catch (error: any) {
          if (error.message.includes("already exists")) {
            set.status = "Conflict"; // 409
            return { message: error.message };
          }
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        body: t.Array(DepartmentCreateUpdateSchema),
        response: {
          201: t.Object({
            newDepartment: t.Array(DepartmentWithRelationsSchema), // ใช้ schema พร้อม relations
            message: t.String(),
          }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Departments"],
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

          const result = await DepartmentService.findAll({
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
            data: t.Array(DepartmentWithRelationsSchema),
            meta_data: t.Object({
              page: t.Number(),
              itemsPerPage: t.Number(),
              total: t.Number(),
              totalPages: t.Number(),
              nextPage: t.Boolean(),
              previousPage: t.Boolean(),
            }),
          }),
          204: t.Object({ message: t.String() }), // กรณีไม่มีข้อมูลในหน้านั้นๆ
          500: t.Object({ message: t.String() }),
        },
        tags: ["Departments"],
      }
    )
    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const department = await DepartmentService.findById(params.id);
          if (!department) {
            set.status = "Not Found"; // 404
            return { message: `Department with ID ${params.id} not found.` };
          }
          return department;
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
          200: DepartmentWithRelationsSchema,
          404: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Departments"],
      }
    )
    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const updatedDepartment = await DepartmentService.update(
            params.id,
            body
          );
          set.status = "OK"; // 200
          return {
            updatedDepartment,
            message: "Department updated successfully",
          };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (error.message.includes("Unique constraint violated")) {
            set.status = "Conflict"; // 409
            return { message: error.message };
          }
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: t.Partial(DepartmentCreateUpdateSchema),
        response: {
          200: t.Object({
            updatedDepartment: DepartmentWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Departments"],
      }
    )
    .delete(
      "/",
      async ({ set }) => {
        try {
          await DepartmentService.deleteAll();
          set.status = "OK"; // 200
          return {
            message: "Departments deleted successfully",
          };
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
        tags: ["Departments"],
      }
    )
    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deletedDepartment = await DepartmentService.deleteById(params.id);
          set.status = "OK"; // 200
          return {
            deletedDepartment,
            message: "Department deleted successfully",
          };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (
            error.message.includes(
              "Cannot delete department because it has related records"
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
            deletedDepartment: DepartmentWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Departments"],
      }
    );
}
