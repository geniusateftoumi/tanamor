export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
}

export enum AppState {
  LANDING = 'LANDING',
  CHAT = 'CHAT',
  LAWS = 'LAWS',
  RIGHTS = 'RIGHTS',
  PROFILE = 'PROFILE',
}

export interface QuizOption {
  id: string;
  text: string;
  score: number;
  feedback: string;
}

export interface QuizScenario {
  theme: string;
  scenario_text: string;
  options: QuizOption[];
}

export interface GameState {
  currentQuestionIndex: number; // 0 to 24
  totalScore: number;
  scoresByTheme: Record<string, number>;
  isGameOver: boolean;
  history: Message[];
}
