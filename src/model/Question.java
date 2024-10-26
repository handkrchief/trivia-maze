package model;

import java.util.List;
import java.util.Scanner;



public class Question {
	
	private static String INCORRECT_TEXT = "INCORRECT_ANSWER";
	
	private final  String myQuestionText;
	private final String myCorrectAnswer;
	private List<String> myChoices;
	private boolean isAskedAlready;
	public Question(String theQuestionText, String theCorrectAnswer, List<String> theChoices) {
		this.myQuestionText = setMyQuestionText(theQuestionText);
		this.myCorrectAnswer = setMyCorrectAnswer(theCorrectAnswer);
		this.myChoices = setMyChoices(theChoices);
		this.isAskedAlready = false;
	}
	
	private void invalidateChoice(int theInvalidChoiceIdx) {
		this.myChoices.set(theInvalidChoiceIdx, INCORRECT_TEXT);
	}
	
	
	// On the UML this was a string, however it makes sense to return a boolean for usage in other classes
	// ex: doors close upon wrong answers, which we can use a true false value for movement vs closing a path. 
	public boolean askQuestion() {
		this.printQuestion();
		this.printChoices();
		System.out.println("Enter an int to select a choice: ");
		
		Scanner scanny = new Scanner(System.in);
		int theChosenAnswerIdx = scanny.nextInt() -1 ;
		String theChosenAnswer = myChoices.get(theChosenAnswerIdx);
		boolean isCorrect = theChosenAnswer.equals(this.myCorrectAnswer);
		if(!isCorrect) {
			this.invalidateChoice(theChosenAnswerIdx);
		}
		
		this.printResult(isCorrect);
		return isCorrect;
	}
	
	public String getMyQuestionText() {
        return myQuestionText;
    }

    public String getMyCorrectAnswer() {
        return myCorrectAnswer;
    }

    public List<String> getMyChoices() {
        return myChoices;
    }
    
	private String setMyQuestionText(String theQuestionText) {
		if(!theQuestionText.equals(null) || theQuestionText.length() == 0) {
			return theQuestionText;
		}
		throw new IllegalArgumentException("Invalid Value: Question text was blank/null.");
	}
	
	private String setMyCorrectAnswer(String theQuestionAnswer) {
		if(!theQuestionAnswer.equals(null) || theQuestionAnswer.length() == 0) {
			return theQuestionAnswer;
		}
		throw new IllegalArgumentException("Invalid Value: Answer text was blank/null.");
	}
	
	private List<String> setMyChoices(List<String> theChoices) {
		if(!theChoices.equals(null) || theChoices.size() == 0) {
			return theChoices;
		}
		throw new IllegalArgumentException("Invalid Value: Choices list was blank/null.");
	}
	
	public void setIsAskedAlready(boolean theStatus) {
		this.isAskedAlready = theStatus;
	}
	
	private void printQuestion() {
		System.out.println(this.getMyQuestionText());
	}
	
	private void printChoices() {
		List<String> theChoices = this.getMyChoices();
		int count = 1;
		for(String choice: theChoices) {
			System.out.println(count + ": " + choice);
			count++;
		}
	}
	
	private void printResult(boolean result) {
		if(result) {
	        System.out.println("Correct!");
	    } else {
	        System.out.println("Incorrect!");
	    }
	}
	
}
