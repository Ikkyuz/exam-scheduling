import Elysia, { t } from "elysia";
import { RoomSchema, RoomCreateUpdateSchema } from "./room.schema";
import { RoomService } from "./room.service";

export namespace RoomController {
  export const roomController = new Elysia({ prefix: "/rooms" })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const newRoom = await RoomService.createMany(body);
          set.status = 201;
          return {
            newRoom, // array ของ Room objects
            message: "Rooms created successfully",
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
        body: t.Array(RoomCreateUpdateSchema),
        response: {
          201: t.Object({
            newRoom: t.Array(RoomSchema), // ต้องเป็น array
            message: t.String(),
          }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Rooms"],
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

          const result = await RoomService.findAll({
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
            data: t.Array(RoomSchema),
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
        tags: ["Rooms"],
      }
    )
    .get(
      "/:id",
      async ({ params, set }) => {
        try {
          const result = await RoomService.findById(params.id);
          return result;
        } catch (error: any) {
          if (error.message === "Room not found") {
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
          200: RoomSchema,
          404: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Rooms"],
      }
    )
    .patch(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const updatedRoom = await RoomService.update(params.id, body);
          set.status = "OK"; // 200
          return { updatedRoom, message: "Room updated successfully" };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (
            error.message.includes("Unique constraint violated") ||
            error.message.includes("already exists")
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
        body: RoomSchema,
        response: {
          200: t.Object({
            updatedRoom: RoomCreateUpdateSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Rooms"],
      }
    )
    .delete(
      "/",
      async ({ set }) => {
        try {
          await RoomService.deleteAll();
          set.status = "OK"; // 200
          return { message: "All Rooms deleted successfully" };
        } catch (error: any) {
          set.status = "Internal Server Error"; // 500
          return { message: error.message || "Internal Server Error" };
        }
      },
      {
        response: {
          200: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Rooms"],
      }
    )
    .delete(
      "/:id",
      async ({ params, set }) => {
        try {
          const deletedRoom = await RoomService.deleteById(params.id);
          set.status = "OK"; // 200
          return { deletedRoom, message: "Room deleted successfully" };
        } catch (error: any) {
          if (error.message.includes("not found")) {
            set.status = "Not Found"; // 404
            return { message: error.message };
          }
          if (
            error.message.includes(
              "Cannot delete Room because it has related records"
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
            deletedRoom: RoomSchema,
            message: t.String(),
          }),
          404: t.Object({ message: t.String() }),
          409: t.Object({ message: t.String() }),
          500: t.Object({ message: t.String() }),
        },
        tags: ["Rooms"],
      }
    );
}
