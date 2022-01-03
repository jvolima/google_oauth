import { prismaClient } from "../../../../database/prismaClient";


export class FindUserByEmailUseCase {
  async execute(email: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    return user;
  }
}