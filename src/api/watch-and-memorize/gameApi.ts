import { apiClient, ApiError } from "./apiClient";

// ========== TYPE DEFINITIONS ==========
export interface GameSession {
  playerName: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  difficulty: string;
  coinsEarned: number; // ✅ Add coins earned
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
  coins: number; // ✅ User's total coins balance
  highScore: number;
  gamesPlayed: number;
  pendants: Record<string, number>;
}

export interface CoinsResponse {
  userId: string;
  username: string;
  coins: number;
}

export interface PendantResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  owned?: number;
}

export interface OwnedPendantsResponse {
  userId: string;
  pendants: PendantResponse[];
}

// ========== CRUD FUNCTIONS ==========
export const gameApi = {
  // ===== COINS ENDPOINTS =====

  // ✅ GET - Get user's current coins balance
  async getUserCoins(): Promise<CoinsResponse> {
    return apiClient.get("/api/game/game-type/watch-and-memorize/coins");
  },

  // ✅ POST - Submit game result dengan automatic coins addition
  async submitGameResult(
    gameId: string,
    session: GameSession,
  ): Promise<{ success: boolean; coinsEarned: number }> {
    return apiClient.post(
      `/api/game/game-type/watch-and-memorize/${gameId}/submit`,
      {
        score: session.score,
        correctAnswers: session.correctAnswers,
        totalQuestions: session.totalQuestions,
        timeSpent: session.timeSpent,
        coinsEarned: session.coinsEarned,
      },
    );
  },

  // ===== PENDANT ENDPOINTS =====

  // ✅ GET - Get available pendants in shop
  async getAvailablePendants(): Promise<PendantResponse[]> {
    return apiClient.get(
      "/api/game/game-type/watch-and-memorize/pendant/shop",
    );
  },

  // ✅ GET - Get user's owned pendants
  async getOwnedPendants(): Promise<OwnedPendantsResponse> {
    return apiClient.get(
      "/api/game/game-type/watch-and-memorize/pendant/owned",
    );
  },

  // ✅ POST - Purchase pendant (deduct coins, add to inventory)
  async purchasePendant(
    pendantId: string,
  ): Promise<{ success: boolean; pendantName: string; newQuantity: number }> {
    return apiClient.post(
      "/api/game/game-type/watch-and-memorize/pendant/purchase",
      { pendantId },
    );
  },

  // ===== LEGACY ENDPOINTS (kept for backward compatibility) =====

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

  // CREATE/UPDATE - Save user progress (dengan coins)
  async saveUserProgress(
    progress: UserProgress,
  ): Promise<{ success: boolean }> {
    return apiClient.post("/api/game/progress", progress);
  },

  // READ - Get leaderboard
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    return apiClient.get(`/api/game/leaderboard?limit=${limit}`);
  },

  // READ - Get user progress (includes coins)
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

  // UPDATE - Update user progress (dengan coins)
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