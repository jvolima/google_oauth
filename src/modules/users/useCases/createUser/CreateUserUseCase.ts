import { prismaClient } from "../../../../database/prismaClient";

interface ICreateUser {
  name: string;
  email: string;
  password?: string;
}

export class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUser) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if(userExists) {
      throw new Error("User already exists!");
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    });

    return user;
  }
}