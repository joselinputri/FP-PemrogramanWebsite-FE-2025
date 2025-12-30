export interface AnimalProps {
  size?: number;
  isWalking?: boolean;
  isSad?: boolean;
  isHappy?: boolean;
  className?: string;
}

export function safePath(d: string | undefined) {
  if (!d || typeof d !== "string") {
    console.warn("⚠️ Invalid SVG path data:", d);
    return "M0 0";
  }
  return d;
}

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
