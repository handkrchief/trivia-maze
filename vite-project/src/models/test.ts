import Item from "./Item";
import Question from "./Question";

export class Test {
    public static main(): void {
        let item = new Item("50-50");
        let question = new Question("What is the capital of France?", "Paris", ["Paris", "London", "Berlin", "Madrid"]);
        //question.applyItem(item);
        question.askQuestion();
    }
}