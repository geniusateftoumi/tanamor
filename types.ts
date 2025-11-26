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
}

export interface ChatConfig {
  systemInstruction?: string;
}