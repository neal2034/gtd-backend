import { Module } from "@nestjs/common";
import { TodoController } from "../controller/TodoController";
import { TodoService } from "../service/TodoService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "../domain/todo/Todo";
import { TodoManager } from "../manager/todo/TodoManager";
import { UserManager } from "src/manager/user/UserManager";
import { User } from "src/domain/user/User";

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([User])],
  controllers: [TodoController],
  providers: [TodoService, TodoManager, UserManager],
  exports: [],
})
export class TodoModule {}
