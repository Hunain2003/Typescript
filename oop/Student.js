import Person from "./Person.js";
export default class Student extends Person {
    _name;
    constructor() {
        super();
        this._name = "";
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
}
