/**
 * Jest tests written for the Question.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Question from "../src/models/Question";
import Item from "../src/models/Item";

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
    
    // Setter tests
    describe('setters', () => {
        it('should throw error for empty question text', () => {
            expect(() => new Question('', 'Paris', ['Paris']))
                .toThrow(Question.INCORRECT_TEXT);
        });

        it('should throw error for empty correct answer', () => {
            expect(() => new Question('Question?', '', ['Paris']))
                .toThrow(Question.INCORRECT_TEXT);
        });

        it('should throw error for empty choices array', () => {
            expect(() => new Question('Question?', 'Paris', []))
                .toThrow(Question.INCORRECT_TEXT);
        });
    });

    // Item application testing
    describe('applyItem', () => {
        let myQuestion: Question;
            
        beforeEach(() => {
            myQuestion = new Question(
                'Question?', 
                'Correct', 
                ['Wrong1', 'Correct', 'Wrong2', 'Wrong3']
            );
        });

        it('should remove two wrong answers with 50-50', () => {
            const myItem = new Item('50-50');
            myQuestion.applyItem(myItem);
            expect(myQuestion.getMyChoices().length).toBe(2);
            expect(myQuestion.getMyChoices()).toContain('Correct');
        });
    });
    
        // Wrong answer handling
        describe('answer validation', () => {
            let myQuestion: Question;
            
            beforeEach(() => {
                myQuestion = new Question(
                    'Question?',
                    'Correct',
                    ['Wrong', 'Correct', 'Wrong2']
                );
            });
    
            it('should invalidate wrong choice', () => {
                const wrongIndex = myQuestion.getMyChoices().indexOf('Wrong');
                myQuestion['invalidateChoice'](wrongIndex);
                expect(myQuestion.getMyChoices()[wrongIndex]).toBe(Question.INCORRECT_TEXT);
            });
        });
    
        // ToString test
        describe('toString', () => {
            it('should return question text', () => {
                const text = 'Test question?';
                const question = new Question(text, 'Answer', ['Choice']);
                expect(question.toString()).toBe(text);
            });
        });
})