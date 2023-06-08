export class Editcours {
    id_cours: number
    name: string
    pdf_name: string
    description: string

    constructor(id_cours: number,
        name: string,
        pdf_name: string,
        description: string) {
        this.id_cours = id_cours
        this.name = name
        this.pdf_name = pdf_name
        this.description = description

    }
}
