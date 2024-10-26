package model;

import java.util.List;
import java.util.Scanner;

/**
 * The Question class represents a trivia question used in the Trivia Maze game.
 * It contains the question text, a list of possible choices, and the correct answer.
 * This class also handles the logic for asking the question and checking if the 
 * player's answer is correct.
 * 
 * @author Zach Sanchez (zachs00)
 * @version October 26th, 2024
 */
public class Question {
    
    /**
     * A static string used to mark an answer as incorrect.
     */
    private static String INCORRECT_TEXT = "INCORRECT_ANSWER";
    
    /**
     * The text of the question.
     */
    private final String myQuestionText;
    
    /**
     * The correct answer for this question.
     */
    private final String myCorrectAnswer;
    
    /**
     * A list of possible answer choices for this question.
     */
    private List<String> myChoices;

    /**
     * Constructs a new Question object with the provided question text, 
     * correct answer, and list of answer choices.
     * 
     * @param theQuestionText The text of the question.
     * @param theCorrectAnswer The correct answer for the question.
     * @param theChoices A list of possible answer choices.
     */
    public Question(String theQuestionText, String theCorrectAnswer, List<String> theChoices) {
        this.myQuestionText = setMyQuestionText(theQuestionText);
        this.myCorrectAnswer = setMyCorrectAnswer(theCorrectAnswer);
        this.myChoices = setMyChoices(theChoices);
    }
    
    /**
     * Marks a specific choice as incorrect by replacing it with a static string.
     * 
     * @param theInvalidChoiceIdx The index of the incorrect choice to invalidate.
     */
    private void invalidateChoice(int theInvalidChoiceIdx) {
        this.myChoices.set(theInvalidChoiceIdx, INCORRECT_TEXT);
    }
    
    /**
     * Asks the player the question, collects their answer, checks if it's correct,
     * and returns the result as a boolean.
     * 
     * @return true if the player's answer is correct, false if it is incorrect.
     */
    public boolean askQuestion() {
        this.printQuestion();
        this.printChoices();
        System.out.println("Enter an int to select a choice: ");
        
        Scanner scanny = new Scanner(System.in);
        int theChosenAnswerIdx = scanny.nextInt() - 1;
        String theChosenAnswer = myChoices.get(theChosenAnswerIdx);
        boolean isCorrect = theChosenAnswer.equals(this.myCorrectAnswer);
        if (!isCorrect) {
            this.invalidateChoice(theChosenAnswerIdx);
        }
        
        this.printResult(isCorrect);
        return isCorrect;
    }
    
    /**
     * Returns the text of the question.
     * 
     * @return The question text.
     */
    public String getMyQuestionText() {
        return myQuestionText;
    }

    /**
     * Returns the correct answer for the question.
     * 
     * @return The correct answer.
     */
    public String getMyCorrectAnswer() {
        return myCorrectAnswer;
    }

    /**
     * Returns the list of possible answer choices for the question.
     * 
     * @return A list of answer choices.
     */
    public List<String> getMyChoices() {
        return myChoices;
    }
    
    /**
     * Validates and sets the question text. If the text is null or empty, 
     * an exception is thrown.
     * 
     * @param theQuestionText The text of the question.
     * @return The validated question text.
     * @throws IllegalArgumentException if the text is null or empty.
     */
    private String setMyQuestionText(String theQuestionText) {
        if (theQuestionText != null && !theQuestionText.isEmpty()) {
            return theQuestionText;
        }
        throw new IllegalArgumentException("Invalid Value: Question text was blank/null.");
    }
    
    /**
     * Validates and sets the correct answer. If the answer is null or empty,
     * an exception is thrown.
     * 
     * @param theQuestionAnswer The correct answer.
     * @return The validated correct answer.
     * @throws IllegalArgumentException if the answer is null or empty.
     */
    private String setMyCorrectAnswer(String theQuestionAnswer) {
        if (theQuestionAnswer != null && !theQuestionAnswer.isEmpty()) {
            return theQuestionAnswer;
        }
        throw new IllegalArgumentException("Invalid Value: Answer text was blank/null.");
    }
    
    /**
     * Validates and sets the list of answer choices. If the list is null or empty,
     * an exception is thrown.
     * 
     * @param theChoices A list of possible answer choices.
     * @return The validated list of answer choices.
     * @throws IllegalArgumentException if the list is null or empty.
     */
    private List<String> setMyChoices(List<String> theChoices) {
        if (theChoices != null && !theChoices.isEmpty()) {
            return theChoices;
        }
        throw new IllegalArgumentException("Invalid Value: Choices list was blank/null.");
    }
    
    /**
     * Prints the text of the question.
     */
    private void printQuestion() {
        System.out.println(this.getMyQuestionText());
    }
    
    /**
     * Prints the list of possible answer choices, each with a number.
     */
    private void printChoices() {
        List<String> theChoices = this.getMyChoices();
        int count = 1;
        for (String choice : theChoices) {
            System.out.println(count + ": " + choice);
            count++;
        }
    }
    
    /**
     * Prints the result of the player's answer: "Correct!" if they were right, 
     * or "Incorrect!" if they were wrong.
     * 
     * @param result true if the answer was correct, false otherwise.
     */
    private void printResult(boolean result) {
        if (result) {
            System.out.println("Correct!");
        } else {
            System.out.println("Incorrect!");
        }
    }
}
