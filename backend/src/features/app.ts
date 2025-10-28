import { Elysia } from "elysia";
import { DepartmentController } from "./department/department.controller";
import { CourseController } from "./course/course.controller";
import { ClassController } from "./class/class.controller";
import { CourseGroupController } from "./courseGroup/courseGroup.controller";
import { EnrollmentController } from "./enrollment/enrollment.controller";
import { RoomController } from "./room/room.controller";
import { TeacherController } from "./teacher/teacher.controller";
import { ProctorPairController } from "./proctorPair/proctorPair.controller";
import { TokenController } from "./token/token.controller";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";

export const app = () => new Elysia().group("/api", (app) => {
  app.use(AuthController.authController)
  app.use(UserController.userController)
  app.use(TokenController.tokenController)
  app.use(DepartmentController.departmentController)
  app.use(CourseController.courseController)
  app.use(ClassController.classController)
  app.use(CourseGroupController.courseGroupController)
  app.use(EnrollmentController.enrollmentController)
  app.use(RoomController.roomController)
  app.use(TeacherController.teacherController)
  app.use(ProctorPairController.proctorPairController)
  
  return app;
});