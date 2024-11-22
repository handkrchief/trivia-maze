export interface QuestionDataProps{
    questionText:string;
    correctAnswer:string;
    choices:string[];
}

export type QuestionsThemes = "Test" | "Example" | "Math"