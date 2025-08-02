export class Login {
    emailAddress: string
    password: string

    constructor(
        emailAddress: string,
        password: string,
    )
    {
        this.emailAddress = emailAddress;
        this.password = password;
    }
}