import {ITask} from "./store/tasks.models";

export const tasks: ITask[] = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        deadline: new Date(),
        priority: 'Высокий',
        status: 'На распределении',
        performers: ['Assignee 1']
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        deadline: new Date(),
        priority: 'Средний',
        status: 'В работе',
        performers: ['Assignee 2']
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        deadline: new Date(),
        priority: 'Средний',
        status: 'Готово',
        performers: ['Assignee 3']
    },

];