import { Injectable } from "@nestjs/common";
import { Todo } from "../domain/todo/Todo";
import { TodoManager } from "../manager/todo/TodoManager";
import { ITodoAddDto } from "../dto/todo/ITodoAddDto";
import { plainToClass } from "class-transformer";
import { OTodoDto } from "../dto/todo/OTodoDto";
import { ITodoEditDto } from "../dto/todo/ITodoEditDto";
import { UserManager } from "src/manager/user/UserManager";
import { UnAuthorizedException } from "src/exception/UnAuthorizedException";

@Injectable()
export class TodoService {
  constructor(
    private readonly todoManager: TodoManager,
    private readonly userManage: UserManager
  ) {}

  async addTodo(addDto: ITodoAddDto, userName: string) {
    const user = await this.userManage.findByUsername(userName);
    const todo = plainToClass(Todo, addDto);
    todo.user = user;
    const newTodo = await this.todoManager.addEntity(todo);
    return OTodoDto.getFromEntity(newTodo);
  }

  async listTodos(page: number, userName: string) {
    const user = await this.userManage.findByUsername(userName);
    const [entities, total] = await this.todoManager.findAndCount({
      ...this.todoManager.getPageParam(page),
      relations: { user: true },
      where: {
        user: { id: user.id },
      },
    });
    const dtos = entities.map((entity) => OTodoDto.getFromEntity(entity));
    return { total, data: dtos };
  }

  async listAllTodos(userName: string, isDone: boolean) {
    const user = await this.userManage.findByUsername(userName);
    const entities = await this.todoManager.listEntity({
      relations: { user: true },
      where: {
        user: { id: user.id },
        isDone,
      },
    });
    const dtos = entities.map((entity) => OTodoDto.getFromEntity(entity));
    return { data: dtos };
  }

  async getTodo(id: number, username: string) {
    const todo = await this.todoManager.getOneEntity({
      relations: { user: true },
      where: { id: id },
    });
    if (todo.user.username !== username) {
      throw new UnAuthorizedException();
    }
    return todo ? OTodoDto.getFromEntity(todo) : null;
  }

  async updateToDo(editDto: ITodoEditDto, username: string) {
    const oldTodo = await this.todoManager.getOneEntity({
      relations: { user: true },
      where: { id: editDto.id },
    });
    if (oldTodo.user.username !== username) {
      throw new UnAuthorizedException();
    }
    const todo = plainToClass(Todo, editDto);

    await this.todoManager.editEntity(todo);
    return OTodoDto.getFromEntity(todo);
  }

  async deleteTodo(id: number, username: string) {
    const todo = await this.todoManager.getOneEntity({
      relations: { user: true },
      where: { id: id },
    });
    if (todo.user.username !== username) {
      throw new UnAuthorizedException();
    }
    this.todoManager.softDelete(id);
    return OTodoDto.getFromEntity(todo);
  }
}
