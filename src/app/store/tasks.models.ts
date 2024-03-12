export interface ITask {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: 'Низкий' | 'Средний' | 'Высокий';
    status: 'На распределении' | 'В работе' | 'Готово';
    performers: string[];
}