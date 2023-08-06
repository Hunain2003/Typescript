interface student {
    id: number,
    name: string,
    enroll: boolean,
    courseEnrolled: string,
    tutionFeePaid: boolean,
    amountPayable: number
}

export default class Student implements student {
    constructor (
        public id : number,
        public name : string,
        public enroll : boolean,
        public courseEnrolled: string,
        public tutionFeePaid: boolean,
        public amountPayable: number
    ) {}
}