export class CreateTaskDTO {
    public uid: string;
    public title: string;
    public description: string;
    public startsAt: string;
    public endsAt: string;

    constructor(
        uid: string,
        title: string,
        description: string,
        startsAt: string,
        endsAt: string,
        _id: string,
    ) {
        this.uid = uid;
        this.title = title;
        this.description = description;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }
}
