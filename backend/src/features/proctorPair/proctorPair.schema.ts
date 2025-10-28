import { t } from "elysia";
import { TeacherSchema } from "@/features/teacher/teacher.schema";

// ✅ เปลี่ยน teacher_id → teacherIds (array)
export const ProctorPairSchema = t.Object({
  id: t.Number(),
  teacher_ids: t.Array(t.Number(), { minItems: 2, maxItems: 2 }), // ต้องมี 2 คนเท่านั้น
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export type ProctorPair = typeof ProctorPairSchema.static;

// ✅ แสดงข้อมูลความสัมพันธ์กับ teacher
export const ProctorPairWithRelationsSchema = t.Composite([
  ProctorPairSchema,
  t.Object({
    teachers: t.Array(t.Omit(TeacherSchema, ["proctorPairs"])),
  }),
]);

export type ProctorPairWithRelations = typeof ProctorPairWithRelationsSchema.static;

// ✅ ใช้ schema เดียวกัน แต่ไม่ต้องมี id, createdAt, updatedAt
export const ProctorPairCreateUpdateSchema = t.Omit(ProctorPairSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);

export type ProctorPairCreateUpdate = typeof ProctorPairCreateUpdateSchema.static;
