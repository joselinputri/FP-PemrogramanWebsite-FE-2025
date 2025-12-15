// src/pages/watch-and-memorize/admin/EditGame.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { TextareaField } from "@/components/ui/textarea-field";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { Switch } from "@/components/ui/switch";
import Dropzone from "@/components/ui/dropzone";
import { Typography } from "@/components/ui/typography";
import { ANIMALS } from "./components/animals/animalData.ts";
import { ArrowLeft, SaveIcon, X, EyeIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import api from "@/api/axios";

interface DifficultyConfig {
  animalsToWatch: number;
  memorizationTime: number;
  totalRounds: number;
  shuffleSpeed: number;
  guessTimeLimit: number;
}

interface ShopItemConfig {
  price: number;
  available: boolean;
}

type PendantType = "hint" | "freeze" | "double" | "shield" | "reveal";

const PENDANT_INFO = {
  hint: { name: "Hint", icon: "💡", description: "Reveals one correct animal" },
  freeze: { name: "Freeze Time", icon: "❄️", description: "Pauses the timer" },
  double: {
    name: "Double Points",
    icon: "⭐",
    description: "2x score multiplier",
  },
  shield: { name: "Shield", icon: "🛡️", description: "Protects from mistakes" },
  reveal: {
    name: "Reveal All",
    icon: "👁️",
    description: "Shows all answers briefly",
  },
};

function EditWatchAndMemorize() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [backgroundMusic, setBackgroundMusic] = useState<File | null>(null);
  const [backgroundMusicPreview, setBackgroundMusicPreview] = useState<
    string | null
  >(null);

  // Difficulty Configs
  const [difficultyConfigs, setDifficultyConfigs] = useState<
    Record<string, DifficultyConfig>
  >({
    easy: {
      animalsToWatch: 3,
      memorizationTime: 5,
      totalRounds: 1,
      shuffleSpeed: 1000,
      guessTimeLimit: 30,
    },
    medium: {
      animalsToWatch: 4,
      memorizationTime: 4,
      totalRounds: 2,
      shuffleSpeed: 800,
      guessTimeLimit: 25,
    },
    hard: {
      animalsToWatch: 5,
      memorizationTime: 3,
      totalRounds: 3,
      shuffleSpeed: 600,
      guessTimeLimit: 20,
    },
  });

  // Available Animals
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>(
    ANIMALS.slice(0, 8).map((a) => a.id),
  );

  // Shop Config
  const [shopConfig, setShopConfig] = useState<
    Record<PendantType, ShopItemConfig>
  >({
    hint: { price: 50, available: true },
    freeze: { price: 100, available: true },
    double: { price: 150, available: true },
    shield: { price: 80, available: true },
    reveal: { price: 200, available: true },
  });

  const [settings, setSettings] = useState({
    isPublishImmediately: false,
  });

  // Fetch existing game data
  useEffect(() => {
    if (!id) return setLoading(false);

    const fetchGame = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/game/game-type/watch-and-memorize/${id}`,
        );
        const data = res.data.data;

        setTitle(data.name || "");
        setDescription(data.description || "");

        if (data.thumbnail_image) {
          setThumbnailPreview(
            `${import.meta.env.VITE_API_URL}/${data.thumbnail_image}`,
          );
        }

        if (data.background_music) {
          setBackgroundMusicPreview(
            `${import.meta.env.VITE_API_URL}/${data.background_music}`,
          );
        }

        if (data.difficulty_configs) {
          setDifficultyConfigs(data.difficulty_configs);
        }

        if (data.available_animals && Array.isArray(data.available_animals)) {
          setSelectedAnimals(data.available_animals);
        }

        if (data.shop_config) {
          setShopConfig(data.shop_config);
        }

        setSettings({
          isPublishImmediately: !!data.is_publish,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load game data");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const toggleAnimal = (animalId: string) => {
    if (selectedAnimals.includes(animalId)) {
      if (selectedAnimals.length > 3) {
        setSelectedAnimals(selectedAnimals.filter((id) => id !== animalId));
      } else {
        toast.error("Minimum 3 animals required!");
      }
    } else {
      if (selectedAnimals.length < 8) {
        setSelectedAnimals([...selectedAnimals, animalId]);
      } else {
        toast.error("Maximum 8 animals allowed!");
      }
    }
  };

  const handleDifficultyChange = (
    level: string,
    field: keyof DifficultyConfig,
    value: number,
  ) => {
    setDifficultyConfigs({
      ...difficultyConfigs,
      [level]: {
        ...difficultyConfigs[level],
        [field]: value,
      },
    });
  };

  const handleShopChange = (
    pendant: PendantType,
    field: keyof ShopItemConfig,
    value: number | boolean,
  ) => {
    setShopConfig({
      ...shopConfig,
      [pendant]: {
        ...shopConfig[pendant],
        [field]: value,
      },
    });
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnail(file);
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleMusicChange = (file: File | null) => {
    setBackgroundMusic(file);
    if (file) setBackgroundMusicPreview(URL.createObjectURL(file));
  };

   const handleSubmit = async (publish = false) => {
    if (!thumbnail && !thumbnailPreview) {
      return toast.error("Thumbnail is required");
    }
    if (!title.trim()) return toast.error("Game title is required");
    if (selectedAnimals.length < 3) {
      return toast.error("Please select at least 3 animals");
    }

    const formData = new FormData();
    
    formData.append("name", title);
    formData.append("description", description);

    if (thumbnail instanceof File) {
      formData.append("thumbnail_image", thumbnail);
    }

    if (backgroundMusic instanceof File) {
      formData.append("background_music", backgroundMusic);
    }

    formData.append(
      "is_publish",
      String(publish || settings.isPublishImmediately)
    );

    const gameJson = {
      difficulty_configs: difficultyConfigs,
      available_animals: selectedAnimals,
      shop_config: shopConfig,
    };
    
    formData.append("game_json", JSON.stringify(gameJson));

    try {
      setLoading(true);
      
      console.log("📤 Sending update request:");
      console.log("- Title:", title);
      console.log("- Description:", description);
      console.log("- Game JSON:", gameJson);
      console.log("- Is Published:", publish || settings.isPublishImmediately);
      
      const response = await api.patch(
        `/api/game/game-type/watch-and-memorize/${id}`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data" 
          },
        }
      );
      
      console.log("✅ Update response:", response.data);
      
      toast.success("Game updated successfully!");
      navigate("/my-projects");
    } catch (err: any) {
      console.error("❌ Update failed:", err);
      console.error("Error response:", err.response?.data);
      
      const errorMessage = err.response?.data?.message || "Failed to update game. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen flex flex-col">
      <div className="bg-white h-fit w-full flex justify-between items-center px-8 py-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate("/my-projects")}
        >
          <ArrowLeft /> Back
        </Button>
      </div>

      <div className="w-full h-full p-8 justify-center items-center flex flex-col">
        <div className="max-w-3xl w-full space-y-6">
          <div>
            <Typography variant="h3">Edit Watch & Memorize Game</Typography>
            <Typography variant="p" className="mt-2">
              Update your memory game. Changes will be saved when you click Save
              or Publish.
            </Typography>
          </div>

          {/* Game Info Section */}
          <div className="bg-white w-full h-full p-6 space-y-6 rounded-xl border">
            <div>
              <FormField
                required
                label="Game Title"
                placeholder="Memory Challenge Pro"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <TextareaField
              label="Description"
              placeholder="Test your memory with cute animals..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <Dropzone
                required
                defaultValue={thumbnailPreview ?? undefined}
                label="Thumbnail Image"
                allowedTypes={["image/png", "image/jpeg"]}
                maxSize={2 * 1024 * 1024}
                onChange={handleThumbnailChange}
              />
            </div>
            <div>
              <Dropzone
                defaultValue={backgroundMusicPreview ?? undefined}
                label="Background Music (Optional)"
                allowedTypes={["audio/mpeg", "audio/mp3"]}
                maxSize={5 * 1024 * 1024}
                onChange={handleMusicChange}
              />
            </div>
          </div>

          {/* Difficulty Settings */}
          <div className="flex justify-between items-center">
            <Typography variant="p">Difficulty Settings</Typography>
          </div>

          {Object.entries(difficultyConfigs).map(([level, config]) => (
            <div
              key={level}
              className="bg-white w-full h-full p-6 space-y-4 rounded-xl border"
            >
              <div className="flex justify-between">
                <Typography variant="p" className="capitalize font-bold">
                  {level === "easy" && "🟢 "}
                  {level === "medium" && "🟡 "}
                  {level === "hard" && "🔴 "}
                  {level}
                </Typography>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">
                    Animals to Watch <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="3"
                    type="number"
                    value={config.animalsToWatch.toString()}
                    onChange={(e) =>
                      handleDifficultyChange(
                        level,
                        "animalsToWatch",
                        parseInt(e.target.value) || 1,
                      )
                    }
                  />
                </div>
                <div>
                  <Label className="mb-2">
                    Memorization Time (seconds){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="5"
                    type="number"
                    value={config.memorizationTime.toString()}
                    onChange={(e) =>
                      handleDifficultyChange(
                        level,
                        "memorizationTime",
                        parseInt(e.target.value) || 1,
                      )
                    }
                  />
                </div>
                <div>
                  <Label className="mb-2">
                    Total Rounds <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="1"
                    type="number"
                    value={config.totalRounds.toString()}
                    onChange={(e) =>
                      handleDifficultyChange(
                        level,
                        "totalRounds",
                        parseInt(e.target.value) || 1,
                      )
                    }
                  />
                </div>
                <div>
                  <Label className="mb-2">
                    Shuffle Speed (ms) <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="1000"
                    type="number"
                    value={config.shuffleSpeed.toString()}
                    onChange={(e) =>
                      handleDifficultyChange(
                        level,
                        "shuffleSpeed",
                        parseInt(e.target.value) || 100,
                      )
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2">
                    Guess Time Limit (seconds){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="30"
                    type="number"
                    value={config.guessTimeLimit.toString()}
                    onChange={(e) =>
                      handleDifficultyChange(
                        level,
                        "guessTimeLimit",
                        parseInt(e.target.value) || 10,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Animals Selection */}
          <div className="flex justify-between items-center">
            <Typography variant="p">
              Select Animals ({selectedAnimals.length}/8)
            </Typography>
          </div>

          <div className="bg-white w-full h-full p-6 space-y-4 rounded-xl border">
            <div className="grid grid-cols-4 gap-4">
              {ANIMALS.map((animal) => {
                const AnimalComponent = animal.component;
                const isSelected = selectedAnimals.includes(animal.id);
                return (
                  <div
                    key={animal.id}
                    onClick={() => toggleAnimal(animal.id)}
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AnimalComponent size={40} isHappy />
                      <span className="text-xs font-medium capitalize">
                        {animal.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Typography variant="small" className="text-gray-500">
              Select 3-8 animals for the game
            </Typography>
          </div>

          {/* Shop Configuration */}
          <div className="flex justify-between items-center">
            <Typography variant="p">Shop Configuration (Pendants)</Typography>
          </div>

          {Object.entries(shopConfig).map(([pendant, config]) => {
            const info = PENDANT_INFO[pendant as PendantType];
            return (
              <div
                key={pendant}
                className="bg-white w-full h-full p-6 space-y-4 rounded-xl border"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <Typography variant="p" className="font-bold">
                        {info.name}
                      </Typography>
                      <Typography variant="small" className="text-gray-500">
                        {info.description}
                      </Typography>
                    </div>
                  </div>
                  <Switch
                    checked={config.available}
                    onCheckedChange={(val) =>
                      handleShopChange(pendant as PendantType, "available", val)
                    }
                  />
                </div>

                <div>
                  <Label className="mb-2">
                    Price (Coins) <span className="text-red-500">*</span>
                  </Label>
                  <FormField
                    label=""
                    placeholder="50"
                    type="number"
                    value={config.price.toString()}
                    onChange={(e) =>
                      handleShopChange(
                        pendant as PendantType,
                        "price",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
              </div>
            );
          })}

          {/* Settings Section */}
          <div className="bg-white w-full p-6 space-y-6 rounded-xl border">
            <Typography variant="p">Settings</Typography>
            <div className="flex justify-between items-center">
              <div>
                <Label>Publish Immediately</Label>
                <Typography variant="small">
                  Make the game public right away
                </Typography>
              </div>
              <Switch
                checked={settings.isPublishImmediately}
                onCheckedChange={(val) =>
                  setSettings((prev) => ({
                    ...prev,
                    isPublishImmediately: val,
                  }))
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <X /> Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel? All unsaved changes will be
                    lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Editing</AlertDialogCancel>
                  <AlertDialogAction onClick={() => navigate("/my-projects")}>
                    Discard
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSubmit(false)}
            >
              <SaveIcon /> Save Draft
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black text-white"
              onClick={() => handleSubmit(true)}
            >
              <EyeIcon /> Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWatchAndMemorize;
