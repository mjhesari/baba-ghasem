import { lifeEvents } from "@/content/life-events";
import { manuscripts } from "@/content/manuscripts";
import { mediaItems } from "@/content/media";
import { memories } from "@/content/memories";
import { places } from "@/content/places";

export function getManuscripts() {
  return manuscripts;
}

export function getManuscript(slug: string) {
  return manuscripts.find((item) => item.slug === slug);
}

export function getMemories() {
  return memories;
}

export function getLifeEvents() {
  return lifeEvents;
}

export function getPlaces() {
  return places;
}

export function getMedia() {
  return mediaItems;
}
