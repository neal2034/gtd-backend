import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { TodoService } from "../service/TodoService";
import { ITodoAddDto } from "../dto/todo/ITodoAddDto";
import { ITodoEditDto } from "../dto/todo/ITodoEditDto";
import { Request } from "express";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async addTodo(@Body() addDto: ITodoAddDto, @Req() req: Request) {
    const username = req.user.username;
    await this.todoService.addTodo(addDto, username);
  }

  @Get("detail")
  async getTodo(@Query("id", ParseIntPipe) id: number, @Req() req: Request) {
    return await this.todoService.getTodo(id, req.user.username);
  }

  @Get()
  async listPageTodo(@Query("page", ParseIntPipe) page, @Req() req: Request) {
    const username = req.user.username;
    return await this.todoService.listTodos(page, username);
  }

  @Put()
  async updateTodo(@Body() editDto: ITodoEditDto, @Req() req: Request) {
    await this.todoService.updateToDo(editDto, req.user.username);
  }

  @Delete()
  async deleteTodo(@Query("id", ParseIntPipe) id: number, @Req() req: Request) {
    await this.todoService.deleteTodo(id, req.user.username);
  }
}
