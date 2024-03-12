import {Pipe, PipeTransform} from '@angular/core';
import {ITask} from "../../../store/tasks.models";

@Pipe({
    name: 'taskFilter',
    standalone: true
})
export class TaskFilterPipe implements PipeTransform {

    transform(tasks: ITask[], status: string): ITask[] {
        return tasks.filter(task => task.status === status);
    }

}
