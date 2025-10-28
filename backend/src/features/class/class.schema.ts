import { t } from "elysia";
import { EnrollmentSchema } from "../enrollment/enrollment.schema";
import { Level } from "@/providers/database/generated/mysql/enums"; // ✅ import enum มาจาก Prisma 

export const ClassSchema = t.Object({
    id: t.Number(),
    name: t.String(),
    level: t.Enum(Level),
    classYear: t.String(),
    department_id: t.Number(),
    amount: t.Number(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
});

export type Class = typeof ClassSchema.static;

// Schema for Relations
export const ClassWithRelationsSchema = t.Composite([
    ClassSchema,
    t.Object({
        department: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
        })),
        enrollments: t.Array(t.Omit(EnrollmentSchema, ["createdAt", "updatedAt"])),
    }),
]);

export type ClassWithRelations = typeof ClassWithRelationsSchema.static;

export const ClassCreateUpdateSchema = t.Omit(ClassSchema, [
    "id",
    "createdAt",
    "updatedAt",
]);

export type ClassCreateUpdate = typeof ClassCreateUpdateSchema.static;