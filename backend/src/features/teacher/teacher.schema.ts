import { t } from "elysia";

export const TeacherSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  department_id: t.String(),
  tel: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export type Teacher = typeof TeacherSchema.static;

export const TeacherCreateUpdateSchema = t.Omit(TeacherSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type TeacherCreateUpdate = typeof TeacherCreateUpdateSchema.static;

export const TeacherWithRelationsSchema = t.Composite([
  TeacherSchema,
  t.Object({
    department: t.Omit(TeacherSchema, ["createdAt", "updatedAt"]), // ป้องกัน Circular dependency
    proctorPairs: t.Array(t.Omit(TeacherSchema, ["createdAt", "updatedAt"])),
  }),
]);