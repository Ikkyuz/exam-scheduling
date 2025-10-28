import prisma from "@/providers/database/database.provider";
import { UserCreateUpdate } from "@/features/user/user.schema";
import { Role } from "@/providers/database/generated/mysql/enums"; // ✅ import enum มาจาก Prisma

export namespace UserRepository {
  export async function create(user: UserCreateUpdate) {
    return prisma.user.create({
      data: {
        ...user,
        role: user.role ?? Role.USER,
      },
    });
  }

  export async function findAll(options: {
    skip: number;
    take: number;
    search?: string;
  }) {
    const where = options.search
      ? {
          username: {
            contains: options.search,
          },
        }
      : {};

    return prisma.user.findMany({
      where,
      take: options.take,
      skip: options.skip,
      orderBy: { createdAt: "desc" },
    });
  }

  export async function findUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  export async function findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  export async function update(
    id: string,
    user: Partial<UserCreateUpdate>
  ) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
    });
  }

  export async function deleteById(id: string) {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  export async function countAll(search?: string) {
    const where = search
      ? {
          username: {
            contains: search,
          },
        }
      : {};
    return await prisma.user.count({ where });
  }
}
