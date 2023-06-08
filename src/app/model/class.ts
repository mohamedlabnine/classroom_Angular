export class Class {
    name: string
    image: string
    branch: string
    description: string
    date_created: Date = new Date()
    code: string = ""
    id_Teacher: number = 0
    id: number = 0



    constructor(name: string, image: string, branch: string, description: string, id_class?: number, date?: Date, code?: string, id_Teacher?: number) {
        this.name = name
        this.image = image
        this.branch = branch
        this.description = description
        if (code && date) {
            this.date_created = date
            this.code = code
        }
        if (id_class) {
            this.id = id_class
        }
        if (id_Teacher) {
            this.id_Teacher = id_Teacher
        }
    }
}
