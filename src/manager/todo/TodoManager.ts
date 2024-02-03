import { BaseDataManager } from "../BaseDataManager";
import { Todo } from "../../domain/todo/Todo";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoManager extends BaseDataManager<Todo>(Todo){

}