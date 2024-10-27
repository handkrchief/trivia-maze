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

		Item ff = new Item("50-50");
		Item PaF = new Item("Phone-a-Friend");
//		test.applyItem(PaF);
//		test.askQuestion();
		Room aRoom = new Room(true, test, ff);
		Item i = aRoom.getItem();
		System.out.println("toString Test:"+i);
		Question q = aRoom.getQuestion();
		System.out.println("toString Test:"+q);
		q.askQuestion();

	}

}
