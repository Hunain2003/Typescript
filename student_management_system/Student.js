export default class Student {
    id;
    name;
    enroll;
    courseEnrolled;
    tutionFeePaid;
    amountPayable;
    constructor(id, name, enroll, courseEnrolled, tutionFeePaid, amountPayable) {
        this.id = id;
        this.name = name;
        this.enroll = enroll;
        this.courseEnrolled = courseEnrolled;
        this.tutionFeePaid = tutionFeePaid;
        this.amountPayable = amountPayable;
    }
}
