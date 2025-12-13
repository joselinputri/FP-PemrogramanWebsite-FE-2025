import type { AnimalProps } from "./AnimalCollection";
import {
  CardPenguin,
  Cow,
  Duck,
  Lamb,
  Hedgehog,
  Bear,
  Fox,
  Dog,
} from "./AnimalCollection";
export type { AnimalProps };
export type AnimalId =
  | "penguin"
  | "cow"
  | "duck"
  | "lamb"
  | "hedgehog"
  | "bear"
  | "fox"
  | "dog";

export const ANIMALS: {
  id: AnimalId;
  name: string;
  component: React.FC<AnimalProps>;
}[] = [
  { id: "penguin", name: "Penguin", component: CardPenguin },
  { id: "cow", name: "Cow", component: Cow },
  { id: "duck", name: "Duck", component: Duck },
  { id: "lamb", name: "Lamb", component: Lamb },
  { id: "hedgehog", name: "Hedgehog", component: Hedgehog },
  { id: "bear", name: "Bear", component: Bear },
  { id: "fox", name: "Fox", component: Fox },
  { id: "dog", name: "Dog", component: Dog },
];
