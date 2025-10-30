export type Level = 'Pvoc' | 'Pvs';

export interface Class {
    id: number;
    name: string;
    level: Level;
    classYear: string;
    department_id: number;
    amount: number;
}