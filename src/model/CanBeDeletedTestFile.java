package model;

import java.util.ArrayList;
import java.util.List;

public class CanBeDeletedTestFile {

	public static void main(String[] args) {
		List<String> theAnswer = new ArrayList<>();
		theAnswer.add("Not Right");
		theAnswer.add("Not Left");
		theAnswer.add("Not Up");
		theAnswer.add("A Test Answer");
		Question test = new Question(
				"Is this a Test Question ? ",
				"A Test Answer",
				theAnswer
				);
<<<<<<< Updated upstream
		
=======
		Item ff = new Item("50-50");
		Item PaF = new Item("Phone-a-Friend");
		test.applyItem(PaF);
>>>>>>> Stashed changes
		test.askQuestion();
	}

}
