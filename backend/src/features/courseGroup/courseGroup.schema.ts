import { t } from "elysia";

export const CourseGroupSchema = t.Object({
  id: t.Number(),
  course_id: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export type CourseGroup = typeof CourseGroupSchema.static;

// Schema สำหรับ Relations
export const CourseGroupWithRelationsSchema = t.Composite([
  CourseGroupSchema,
  t.Object({
    course: t.Array(
      t.Object({
        id: t.String(),
        code: t.String(),
        name: t.String(),
        duration: t.Number(),
        examType: t.UnionEnum(["InSchedule", "OutSchedule"]),
      })
    ),
  }),
]);

export type CourseGroupWithRelations =
  typeof CourseGroupWithRelationsSchema.static;

// Schema สำหรับ Create/Update
export const CourseGroupCreateUpdateSchema = t.Omit(CourseGroupSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type CourseGroupCreateUpdate =
  typeof CourseGroupCreateUpdateSchema.static;
