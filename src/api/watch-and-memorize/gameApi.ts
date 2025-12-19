import { apiClient } from "./apiClient";

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

// ========== GAME API ==========
export const gameApi = {
  // ✅ COINS - Get user's coins (AUTH REQUIRED)
  async getUserCoins(): Promise<CoinsResponse> {
    return apiClient.get("/game/game-type/watch-and-memorize/coins");
  },

  // ✅ SUBMIT RESULT - Submit game & earn coins
  async submitGameResult(
    gameId: string,
    session: GameSession,
  ): Promise<any> {
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

  // ✅ LEADERBOARD - Get game leaderboard (PUBLIC)
  async getLeaderboard(gameId: string, limit: number = 10): Promise<any> {
    return apiClient.get(
      `/api/game/game-type/watch-and-memorize/${gameId}/leaderboard?limit=${limit}`
    );
  },

  // ✅ PENDANT SHOP - Get available pendants (PUBLIC)
  async getAvailablePendants(): Promise<PendantResponse[]> {
    return apiClient.get("/game/game-type/watch-and-memorize/pendant/shop");
  },

  // ✅ OWNED PENDANTS - Get user's pendants (AUTH REQUIRED)
  async getOwnedPendants(): Promise<OwnedPendantsResponse> {
    return apiClient.get("/game/game-type/watch-and-memorize/pendant/owned");
  },

  // ✅ PURCHASE PENDANT - Buy pendant with coins (AUTH REQUIRED)
  async purchasePendant(pendantId: string): Promise<any> {
    return apiClient.post(
      "/game/game-type/watch-and-memorize/pendant/purchase",
      { pendantId },
    );
  },

};