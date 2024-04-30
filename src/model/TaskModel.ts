export interface TaskModel {
    _id: string;
    uid: string;
    title: string;
    description: string;
    startsAt: Date;
    endsAt: Date;
    done: boolean;
    isHoliday: boolean;
    holidayName: string | null;
}
