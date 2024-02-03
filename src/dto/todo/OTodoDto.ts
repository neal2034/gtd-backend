import { Todo } from "../../domain/todo/Todo";
import { instanceToPlain, plainToClass } from "class-transformer";

export class OTodoDto{
  id:number;
  name:string;
  status:boolean;
  addAt:Date;

  static getFromEntity(todo:Todo):OTodoDto{
    const dto =  plainToClass(OTodoDto, instanceToPlain(todo))
    dto.addAt = todo.addAt;
    return  dto
  }
}