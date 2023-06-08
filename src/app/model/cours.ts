import { Class } from "./class"

export class Cours {
    id!: number
    id_Class: number
    name: string
    pdf_name: string
    description: string
    date_creation!: Date

    constructor(id_Class: number, name: string, pdf_name: string, description: string, id?: number, date?: Date) {
        this.id_Class = id_Class
        this.name = name
        this.pdf_name = pdf_name
        this.description = description
        if (id && date) {
            this.id = id
            this.date_creation = date
        }


    }
}
