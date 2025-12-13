import { apiClient, ApiError } from "./apiClient";

// ========== TYPE DEFINITIONS ==========
export interface GameSession {
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  difficulty: string;
  coinsEarned: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  difficulty: string;
  timeSpent: number;
  createdAt?: string;
}

export interface UserProgress {
  playerName: string;
  coins: number;
  highScore: number;
  gamesPlayed: number;
  pendants: Record<string, number>;
}

// ========== CRUD FUNCTIONS ==========
export const gameApi = {
  // CREATE - Save game session
  async saveGameSession(session: GameSession): Promise<{ id: string }> {
    return apiClient.post("/api/game/sessions", session);
  },

  // CREATE - Add to leaderboard
  async addToLeaderboard(entry: LeaderboardEntry): Promise<{ id: string }> {
    return apiClient.post("/api/game/leaderboard", entry);
  },

  // CREATE - Increment play count
  async incrementPlayCount(): Promise<{ count: number }> {
    return apiClient.post("/api/game/play-count", {});
  },

  // CREATE/UPDATE - Save user progress
  async saveUserProgress(
    progress: UserProgress,
  ): Promise<{ success: boolean }> {
    return apiClient.post("/api/game/progress", progress);
  },

  // READ - Get leaderboard
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    return apiClient.get(`/api/game/leaderboard?limit=${limit}`);
  },

  // READ - Get user progress
  async getUserProgress(playerName: string): Promise<UserProgress | null> {
    try {
      return await apiClient.get(`/api/game/progress/${playerName}`);
    } catch (error) {
      if ((error as ApiError).status === 404) return null;
      throw error;
    }
  },

  // READ - Get play count
  async getPlayCount(): Promise<{ count: number }> {
    return apiClient.get("/api/game/play-count");
  },

  // READ - Get user's game history
  async getUserGameHistory(playerName: string): Promise<GameSession[]> {
    return apiClient.get(`/api/game/sessions/${playerName}`);
  },

  // UPDATE - Update user progress
  async updateUserProgress(
    playerName: string,
    progress: Partial<UserProgress>,
  ): Promise<{ success: boolean }> {
    return apiClient.put(`/api/game/progress/${playerName}`, progress);
  },

  // DELETE - Clear user progress (untuk testing)
  async clearUserProgress(playerName: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/api/game/progress/${playerName}`);
  },
};
