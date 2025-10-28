import Elysia, { t } from "elysia";
import {
  CourseGroupCreateUpdateSchema,
  CourseGroupWithRelationsSchema,
} from "./courseGroup.schema";
import { CourseGroupService } from "./courseGroup.service";

export namespace CourseGroupController {
  export const courseGroupController = new Elysia({ prefix: "/courseGroups" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const newCourseGroup = await CourseGroupService.createMany(body);
          set.status = "Created";
          return {
            newCourseGroup, // array ของ CourseGroup พร้อม course
            message: "CourseGroup created successfully",
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
        body: t.Array(CourseGroupCreateUpdateSchema),
        response: {
          201: t.Object({
            newCourseGroup: t.Array(CourseGroupWithRelationsSchema), // ใช้ schema พร้อม relations
            message: t.String(),
          }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["CourseGroups"],
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

          const result = await CourseGroupService.findAll({
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
            data: t.Array(CourseGroupWithRelationsSchema),
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
        tags: ["CourseGroups"],
      }
    )

    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const result = await CourseGroupService.findById(params.id);
          return result;
        } catch (error: any) {
          if (error.message === "CourseGroup not found") {
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
          200: CourseGroupWithRelationsSchema,
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["CourseGroups"],
      }
    )

    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const updatedCourseGroup = await CourseGroupService.update(
            params.id,
            body
          );
          set.status = "OK"; // 200
          return {
            data: updatedCourseGroup,
            message: "CourseGroup updated successfully",
          };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return "CourseGroup not found"; // string
          }
          if (error.message.includes("already exists")) {
            set.status = "Conflict"; // 409
            return error.message; // string
          }
          set.status = "Internal Server Error"; // 500
          return error.message || "Internal Server Error"; // string
        }
      },
      {
        params: t.Object({ id: t.String() }),
        body: t.Partial(CourseGroupCreateUpdateSchema),
        response: {
          200: t.Object({
            data: CourseGroupWithRelationsSchema, // ต้อง match relations
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["CourseGroups"],
      }
    )

    .delete(
      "/",
      async ({ set }) => {
        try {
          await CourseGroupService.deleteAll();
          set.status = "OK";
          return {
            message: "All courseGroups deleted successfully",
          };
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
        tags: ["CourseGroups"],
      }
    )

    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deleteCourseGroup = await CourseGroupService.deleteById(
            params.id
          );
          set.status = "OK";
          return {
            deleteCourseGroup,
            message: "CourseGroup deleted successfully",
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
            deleteCourseGroup: CourseGroupWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["CourseGroups"],
      }
    );
}
