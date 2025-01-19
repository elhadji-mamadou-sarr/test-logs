export class EtudiantModel {
    etId : number;
    firstname : string;
    lastname : string;
    nationality: string;
    adress: string;
    email: string;
    phoneNo: string;
    classe: string;
    age: number;
    serviceNo: string;

    constructor() {
        this.age = 0;
        this.nationality = '';
        this.classe = '';
        this.email = '';
        this.firstname = '';
        this.lastname = '';
        this.phoneNo = '';
        this.serviceNo = '';
        this.adress = '';
        this.etId = 1;
        
    }


}