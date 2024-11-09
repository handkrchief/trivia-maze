import Item from "./Item";

export default class Question{
    public static INCORRECT_TEXT = "INCORRECT_ANSWER";

    private myQuestionText!: string;
    private myCorrectAnswer!: string;
    private myChoices!: string[];

    constructor(theQuestionText: string, theCorrectAnswer: string, theChoices: string[]) {
        this.myQuestionText = this.setMyQuestionText(theQuestionText);
        this.myCorrectAnswer = this.setMyCorrectAnswer(theCorrectAnswer);
        this.myChoices = this.setMyChoices(theChoices);
    }

    public applyItem(theItem: Item): void {
        let itemType = theItem.getItemType();
        if(itemType === "50-50"){
            this.applyFiftyFifty();
        } else if(itemType === "Phone-a-Friend"){
            this.applyPhoneAFriend();
        }
    }
    private wrongAnswer(): string {
        let randomIndex = Math.floor(Math.random() * this.myChoices.length);
        let wrongAnswers = this.myChoices.filter(choice => choice !== this.myCorrectAnswer);

        return wrongAnswers[randomIndex];
    }
    private applyPhoneAFriend(): void {
        let chance = Math.random();

        
       
        if(chance < 0.1) {
            alert( this.wrongAnswer());
        } else {
            alert(this.myCorrectAnswer);
        }
    }

    private applyFiftyFifty(): void {
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

    private invalidateChoice(theInvalidChoice:number): void {
        this.myChoices[theInvalidChoice] = Question.INCORRECT_TEXT;
    }

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
    
    public getMyQuestionText(): string {
        return this.myQuestionText;
    }

    public getMyCorrectAnswer(): string {
        return this.myCorrectAnswer;
    } 

    public getMyChoices(): string[] {
        return this.myChoices;
    }   

    public setMyQuestionText(theQuestionText: string): string {
        if(theQuestionText.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
       return theQuestionText;
    }

    public setMyCorrectAnswer(theCorrectAnswer: string): string {
        if(theCorrectAnswer.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
        return theCorrectAnswer;
    }

    public setMyChoices(theChoices: string[]): string[] {
        if(theChoices.length === 0) {
            throw new Error(Question.INCORRECT_TEXT);
        }
        return theChoices;
    }

    private printQuestion(): void {
        console.log(this.myQuestionText);
    }

    private printChoices(): void {
        let choiceNumber = 1;
        this.myChoices.forEach(choice => {
            console.log(choiceNumber + ". " + choice);
            choiceNumber++;
        });
    }

    private printResult(result: boolean): void {
        if(result) {
            console.log("Correct!");
        } else {
            console.log("Incorrect!");
        }
    }
    
    public toString(): string {
        return this.myQuestionText;
    }    
}