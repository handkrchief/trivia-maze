import Question from '../models/Question';
import { QuestionsThemes } from '../types/QuestionTypes';

export default class QuestionFactory {
  private static BASE_URL = 'http://localhost:3001/api';

  public static async fetchQuestionsFromAPI(theme: QuestionsThemes): Promise<Question[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/questions`);
      if (!response.ok) throw new Error('Failed to fetch questions');

      const data = await response.json();

      // Extract questions for the selected theme
      const themeQuestions = data[theme]?.questions || {};

      // Map data to Question instances
      const questions = Object.values(themeQuestions).map((q: any) =>
        new Question(q.questionText, q.correctAnswer, q.choices)
      );

      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }
}