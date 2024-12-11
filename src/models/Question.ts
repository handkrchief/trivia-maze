import Item from "./Item";

/**
 * Question class
 * 
 * Represents a question in the game.
 * 
 * @author Zach Sanchez
 * @version 1.0
*/

export default class Question{
    /**
     * Static string for incorrect text
    */
    public static INCORRECT_TEXT = "INCORRECT_ANSWER";

    /**
     * The question text, with a "!" to signify that it will force initialization if not set
     */
    private myQuestionText!: string;

    /**
     * The correct answer, with a "!" to signify that it will force initialization if not set
     */
    private myCorrectAnswer!: string;

    /**
     * The choices for the question, with a "!" to signify that it will force initialization if not set
     */
    private myChoices!: string[];

    constructor(theQuestionText: string, theCorrectAnswer: string, theChoices: string[]) {
        this.myQuestionText = this.setMyQuestionText(theQuestionText);
        this.myCorrectAnswer = this.setMyCorrectAnswer(theCorrectAnswer);
        this.myChoices = this.setMyChoices(theChoices);
    }


    /**
     * Applies an item to the question
     * 
     * @param {Item} theItem - The item to apply
     * @returns {void}
    */
    public applyItem(theItem: Item): void {
        let itemType = theItem.getItemType();
        if(itemType === "50-50"){
            this.applyFiftyFifty();
        } else if(itemType === "Phone-a-Friend"){
            this.applyPhoneAFriend();
        }
    }

    /**
     * Returns a random wrong answer
     * 
     * @returns {string} - A random wrong answer
    */
    private wrongAnswer(): string {
        let randomIndex = Math.floor(Math.random() * this.myChoices.length);
        let wrongAnswers = this.myChoices.filter(choice => choice !== this.myCorrectAnswer);

        return wrongAnswers[randomIndex];
    }

    /**
     * Applies the Phone-a-Friend item to the question
     * There is a 10% chance that the friend will give the wrong answer
     * 
     * @returns {void}
    */
    public applyPhoneAFriend(): string {
        let chance = Math.random();
        if(chance < 0.1) {
            return this.wrongAnswer();
        } else {
            return this.myCorrectAnswer;
        }
    }

    /**
     * Applies the Fifty-Fifty item to the question
     * Eliminates two wrong answers
     * 
     * @returns {void}
    */
    public applyFiftyFifty(): void {
        if(this.myChoices.includes(Question.INCORRECT_TEXT)){
            console.log("Fifty fifty can only be applied on the first turn.")
            return
        }
        let elim = 0

        while(elim < 2) {
            let wrongAnswer = this.wrongAnswer();
            if(wrongAnswer !== Question.INCORRECT_TEXT){
                this.myChoices.splice(this.myChoices.indexOf(wrongAnswer), 1);
                elim++;
            }
        }
        console.log("Fifty fifty eliminated 2 choices")
    }

    /**
     * Invalidates a choice
     * 
     * @param {number} theInvalidChoice - The index of the choice to invalidate
     * @returns {void}
    */
    private invalidateChoice(theInvalidChoice:number): void {
        this.myChoices[theInvalidChoice] = Question.INCORRECT_TEXT;
    }

    /**
     * Asks the question and returns whether the answer is correct
     * 
     * @returns {boolean} - Whether the answer is correct
    */
    public askQuestion():boolean{
        this.printQuestion();
        this.printChoices();

        let answer = prompt("Enter the number of your answer: ");
        if(answer === null){
            console.log("Not a valid answer. Please enter a number");
            return false;
        }
        let answerNumber = parseInt(answer)-1;
        let theChosenAnswer = this.myChoices[answerNumber];
        let isCorrect = theChosenAnswer === this.myCorrectAnswer;
        if(!isCorrect){
            this.invalidateChoice(answerNumber);
        }

        this.printResult(isCorrect);
        return isCorrect;
    }
    
    /**
     * Gets the question text
     * 
     * @returns {string} - The question text
    */
    public getMyQuestionText(): string {
        return this.myQuestionText;
    }

    /**
     * Gets the correct answer
     * 
     * @returns {string} - The correct answer
    */
    public getMyCorrectAnswer(): string {
        return this.myCorrectAnswer;
    } 

    /**
     * Gets the choices for the question
     * 
     * @returns {string[]} - The choices for the question
     */
    public getMyChoices(): string[] {
        return this.myChoices;
    }   

    /**
     * Sets the questions text
     * 
     * @param {string} theQuestionText - The text to set as the question text
     * @returns {string} - The question text
     */
    public setMyQuestionText(theQuestionText: string): string {
        if(theQuestionText.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
       return theQuestionText;
    }

    /**
     * Sets the correct answer
     * 
     * @param {string} theCorrectAnswer - The correct answer to set
     * @returns {string} - The correct answer
     */
    public setMyCorrectAnswer(theCorrectAnswer: string): string {
        if(theCorrectAnswer.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
        return theCorrectAnswer;
    }


    /**
     * Sets the choices for the question
     * 
     * @param {string[]} theChoices - The choices to set
     * @returns {string[]} - The choices for the question
     */
    public setMyChoices(theChoices: string[]): string[] {
        if(theChoices.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
        return theChoices;
    }


    /**
     * Prints the question
     * 
     * @returns {void}
    */
    private printQuestion(): void {
        console.log(this.myQuestionText);
    }

    /**
     * Prints the choices
     * 
     * @returns {void}
    */
    private printChoices(): void {
        let choiceNumber = 1;
        this.myChoices.forEach(choice => {
            console.log(choiceNumber + ". " + choice);
            choiceNumber++;
        });
    }

    /**
     * prints the result of the question
     * 
     * @param {boolean} result - Whether the answer is correct
     */
    private printResult(result: boolean): void {
        if(result) {
            console.log("Correct!");
        } else {
            console.log("Incorrect!");
        }
    }
    
    /**
     * Returns the question text as a string
     * 
     * @returns {string} - The question text
     */
    public toString(): string {
        return this.myQuestionText;
    }    
}