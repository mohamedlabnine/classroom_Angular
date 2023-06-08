export class Register {
    firstname: string
    lastname: string
    email: string
    password: string
    is_Student: boolean

    constructor(fistname: string, lastname: string, email: string, password: string, is_student: boolean) {
        this.firstname = fistname
        this.lastname = lastname
        this.password = password
        this.email = email
        this.is_Student = is_student
    }
}
