export default class Person {
    personality;
    constructor() {
        this.personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer == 1) {
            this.personality = "Extravert";
        }
        else if (answer == 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "You are still a mystery";
        }
    }
    GetPersonality() {
        return this.personality;
    }
}
