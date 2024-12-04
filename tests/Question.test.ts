/**
 * Jest tests written for the Question.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Question from "../src/models/Question";

describe('Question Class', () => {
    // Constructor tests
    describe('constructor', () => {
        it('should create a question with passed in parameters', () => {
            const myQuestionText = 'What is the capital of France?';
            const myCorrectAnswer = 'Paris';
            const myChoices = ['Berlin', 'Paris', 'Madrid', 'Rome'];
    
            const myQuestion = new Question(myQuestionText, myCorrectAnswer, myChoices);
            expect(myQuestion.getMyQuestionText()).toBe(myQuestionText);
            expect(myQuestion.getMyCorrectAnswer()).toBe(myCorrectAnswer);
            expect(myQuestion.getMyChoices()).toEqual(myChoices);
        });
    });
    
    // Method tests
    // describe('', () => {

    // })
})