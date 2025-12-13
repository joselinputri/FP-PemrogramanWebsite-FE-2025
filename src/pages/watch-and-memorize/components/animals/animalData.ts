import type { AnimalProps } from "./AnimalCollection";
import { Cat, Dog, Duck, Lamb, Hedgehog, Rabbit, Squirrel, Fox } from "./AnimalCollection";

export type AnimalId = "cat" | "dog" | "duck" | "lamb" | "hedgehog" | "rabbit" | "squirrel" | "fox";

export const ANIMALS: { id: AnimalId; name: string; component: React.FC<AnimalProps> }[] = [
  { id: "cat", name: "Cat", component: Cat },
  { id: "dog", name: "Dog", component: Dog },
  { id: "duck", name: "Duck", component: Duck },
  { id: "lamb", name: "Lamb", component: Lamb },
  { id: "hedgehog", name: "Hedgehog", component: Hedgehog },
  { id: "rabbit", name: "Rabbit", component: Rabbit },
  { id: "squirrel", name: "Squirrel", component: Squirrel },
  { id: "fox", name: "Fox", component: Fox },
];
