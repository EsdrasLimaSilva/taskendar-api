export class CreateTaskDTO {
    public title: string;
    public description: string;
    public startsAt: string;
    public endsAt: string;
    public done: boolean;

    constructor(
        title: string,
        description: string,
        startsAt: string,
        endsAt: string,
        done: boolean,
    ) {
        this.title = title;
        this.description = description;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.done = done;
    }
}
