import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } })
      .then((user) => {
        if (user === null) {
          throw new Error('Usuário não encontrado.');
        }
        return user;
      });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  } 

  async update(id: number, updateUserDto: UpdateUserDto) :Promise<User> {

    const data: Prisma.UserUpdateInput = {
      ...updateUserDto
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: id
      }, data
    })
    return {
      ...updateUser,
      password: undefined,
    };
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id
      },
    })
    return deleteUser
  }
}
