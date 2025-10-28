import Elysia, { t } from "elysia";
import {
  ProctorPairCreateUpdateSchema,
  ProctorPairWithRelationsSchema,
} from "./proctorPair.schema";
import { ProctorPairService } from "./proctorPair.service";

export namespace ProctorPairController {
  export const proctorPairController = new Elysia({ prefix: "/ProctorPairs" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const newProctorPair = await ProctorPairService.createMany(body);
          set.status = "Created";
          return {
            newProctorPair, // array ของ ProctorPair objects พร้อม teacher
            message: "ProctorPair created successfully",
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
        body: t.Array(ProctorPairCreateUpdateSchema),
        response: {
          201: t.Object({
            newProctorPair: t.Array(ProctorPairWithRelationsSchema), // ใช้ schema พร้อม relations
            message: t.String(),
          }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["ProctorPairs"],
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

          const result = await ProctorPairService.findAll({
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
            data: t.Array(ProctorPairWithRelationsSchema),
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
        tags: ["ProctorPairs"],
      }
    )

    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const result = await ProctorPairService.findById(params.id);
          return result;
        } catch (error: any) {
          if (error.message === "ProctorPair not found") {
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
          200: t.Object({ data: ProctorPairWithRelationsSchema }),
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["ProctorPairs"],
      }
    )

    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const updatedProctorPair = await ProctorPairService.update(
            params.id,
            body
          );
          set.status = "OK"; // 200
          return {
            data: updatedProctorPair,
            message: "ProctorPair updated successfully",
          };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return "ProctorPair not found"; // string
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
        body: t.Partial(ProctorPairCreateUpdateSchema),
        response: {
          200: t.Object({
            data: ProctorPairWithRelationsSchema, // ต้อง match relations
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["ProctorPairs"],
      }
    )

    .delete(
      "/",
      async ({ set }) => {
        try {
          await ProctorPairService.deleteAll();
          set.status = "OK";
          return {
            message: "All proctorPairs deleted successfully",
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
        tags: ["ProctorPairs"],
      }
    )

    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deleteProctorPair = await ProctorPairService.deleteById(
            params.id
          );
          set.status = "OK";
          return {
            deleteProctorPair,
            message: "ProctorPair deleted successfully",
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
            deleteProctorPair: ProctorPairWithRelationsSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          500: t.String(),
        },
        tags: ["ProctorPairs"],
      }
    );
}
