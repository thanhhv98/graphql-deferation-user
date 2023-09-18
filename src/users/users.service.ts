import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from './prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }


  async findById(id: number): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        id: +id
      }
    })
  }

  async listUsers(): Promise<User[] | []> {
    const users = await this.prismaService.user.findMany({});
    return users;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...createUserInput
      }
    })
  }

}
