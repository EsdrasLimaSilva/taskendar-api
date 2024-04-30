export class TaskDTO {
    public uid: string;
    public title: string;
    public description: string;
    public startsAt: string;
    public endsAt: string;
    public _id: string;
    public done: boolean;
    public isHoliday: boolean;
    public holidayName: string | null;

    constructor(
        uid: string,
        title: string,
        description: string,
        startsAt: string,
        endsAt: string,
        _id: string,
        done: boolean,
        isHoliday: boolean,
        holidayName: string | null,
    ) {
        this._id = _id;
        this.uid = uid;
        this.title = title;
        this.description = description;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.done = done;
        this.isHoliday = isHoliday;
        this.holidayName = holidayName;
    }
}
