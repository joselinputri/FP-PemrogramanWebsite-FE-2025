import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

interface IWatchAndMemorizePlayResponse {
  id: string;
  name: string;
  thumbnail_image: string;
  difficulty: "easy" | "normal" | "hard";
  animalsToWatch: number;
  memorizationTime: number;
  guessTimeLimit: number;
  totalRounds: number;
  animalSequence: string[];
}

export const useGetPlayWatchAndMemorize = (gameId: string) => {
  return useQuery({
    queryKey: ["watch-and-memorize", "play", gameId],
    queryFn: async () => {
      const response = await axiosInstance.get<IWatchAndMemorizePlayResponse>(
        `/api/game/game-type/watch-and-memorize/${gameId}/play`,
      );
      return response.data;
    },
    enabled: !!gameId,
  });
};