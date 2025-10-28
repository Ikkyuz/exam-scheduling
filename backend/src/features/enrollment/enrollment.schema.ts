import { t } from "elysia";

export const EnrollmentSchema = t.Object({
  id: t.Number(),
  class_id: t.Number(),
  course_id: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const EnrollmentCreateUpdateSchema = t.Omit(EnrollmentSchema, [
    "id",
    "createdAt",
    "updatedAt",
]);

export const EnrollmentWithRelationsSchema = t.Composite([
    EnrollmentSchema,
    t.Object({
        class: t.Object({
            id: t.String(),
            name: t.String(),
            level: t.UnionEnum(["Pvoc", "Pvs"]),
            classYear: t.String(),
        }),
        course: t.Object({
            id: t.String(),
            code: t.String(),
            name: t.String(),
            duration: t.Number(),
            examType: t.UnionEnum(["InSchedule", "OutSchedule"]),
        }),
    }), 
]);


export type Enrollment = typeof EnrollmentSchema.Type;
export type EnrollmentCreateUpdate = typeof EnrollmentCreateUpdateSchema.Type;
export type EnrollmentWithRelations = typeof EnrollmentWithRelationsSchema.Type;