export type ArtisanProfile = {
  id: number;
  name: string;
  role: string;
  location: string;
  description: string;
  rating: number;
  cover: string;
  avatar: string;
  business: string;
  experience: string;
  responseTime: string;
  memberSince: string;
  skills: string[];
  services: { name: string; description: string }[];
  galleryFilters: string[];
};

export const artisanProfiles: ArtisanProfile[] = [
  {
    id: 1, name: "Segun Adewale", role: "Master Barber", location: "Lagos, Nigeria",
    description: "I create clean, confident looks through precision cuts, beard care and modern grooming tailored to every client.",
    rating: 4.9, cover: "/artisans/barber.jpg", avatar: "/artisans/avatars/barber-segun.png",
    business: "Segun's Grooming Studio", experience: "8 years", responseTime: "Within 30 mins", memberSince: "March 2021",
    skills: ["Classic cuts", "Fades", "Beard grooming", "Hair treatment", "Kids cuts", "Home service"],
    services: [
      { name: "Premium haircut", description: "Consultation, precision cut and finishing." },
      { name: "Haircut & beard grooming", description: "A complete head-to-beard grooming session." },
      { name: "Home service", description: "Professional grooming at your preferred location." },
    ], galleryFilters: ["All work", "Haircuts", "Beard grooming"],
  },
  {
    id: 2, name: "Mercy Okafor", role: "Professional Baker", location: "Abuja, Nigeria",
    description: "I bake memorable centrepieces and fresh pastries with carefully sourced ingredients for celebrations of every size.",
    rating: 4.8, cover: "/artisans/cake.jpg", avatar: "/artisans/avatars/cake-mercy.png",
    business: "Mercy's Bakehouse", experience: "7 years", responseTime: "Within 1 hour", memberSince: "June 2022",
    skills: ["Wedding cakes", "Pastries", "Fondant", "Dessert tables", "Custom cakes", "Event delivery"],
    services: [
      { name: "Custom celebration cake", description: "A bespoke cake designed for your special occasion." },
      { name: "Pastry box", description: "Freshly baked treats for personal or corporate gifting." },
      { name: "Dessert table", description: "A styled selection of desserts for your event." },
    ], galleryFilters: ["All work", "Celebration cakes", "Pastries"],
  },
  {
    id: 3, name: "Omotunde James", role: "Fashion Designer", location: "Lagos, Nigeria",
    description: "I design and make refined, made-to-measure outfits that balance modern silhouettes with exceptional finishing.",
    rating: 4.9, cover: "/artisans/designer.jpg", avatar: "/artisans/avatars/designer-omotunde.png",
    business: "Tunde James Atelier", experience: "10 years", responseTime: "Within 45 mins", memberSince: "January 2020",
    skills: ["Bespoke tailoring", "Native wear", "Corporate outfits", "Alterations", "Pattern drafting", "Bridal wear"],
    services: [
      { name: "Bespoke native wear", description: "Made-to-measure traditional outfits with premium finishing." },
      { name: "Corporate outfits", description: "Polished workwear designed around your measurements." },
      { name: "Alterations & fitting", description: "Expert adjustments for a comfortable, flattering fit." },
    ], galleryFilters: ["All work", "Corporate outfits", "Native wears"],
  },
  {
    id: 4, name: "Chioma Nwosu", role: "Hair Stylist", location: "Port Harcourt, Nigeria",
    description: "I help clients care for and celebrate their natural hair with protective styles that are neat, comfortable and lasting.",
    rating: 4.7, cover: "/artisans/hairstylist.jpg", avatar: "/artisans/avatars/hairstylist-chioma.png",
    business: "Chi's Hair Room", experience: "6 years", responseTime: "Within 1 hour", memberSince: "August 2022",
    skills: ["Braiding", "Natural hair", "Wig installation", "Silk press", "Loc maintenance", "Home service"],
    services: [
      { name: "Protective styling", description: "Comfortable braids and twists with clean finishing." },
      { name: "Natural hair care", description: "Wash, treatment and styling for healthy natural hair." },
      { name: "Wig installation", description: "Natural-looking, secure installation and styling." },
    ], galleryFilters: ["All work", "Braids", "Natural hair"],
  },
  {
    id: 5, name: "Ayomide Bello", role: "Professional Painter", location: "Ibadan, Nigeria",
    description: "I deliver tidy residential and commercial painting with durable materials, accurate colour matching and clean handovers.",
    rating: 4.6, cover: "/artisans/painter.jpg", avatar: "/artisans/avatars/painter-ayomide.png",
    business: "Bello Paintworks", experience: "9 years", responseTime: "Within 2 hours", memberSince: "November 2021",
    skills: ["Interior painting", "Exterior painting", "Wall preparation", "Colour consulting", "Textured finish", "Commercial spaces"],
    services: [
      { name: "Interior painting", description: "Preparation and a smooth finish for homes and offices." },
      { name: "Exterior painting", description: "Weather-resistant finishes made to last." },
      { name: "Colour consultation", description: "Practical help choosing a cohesive colour palette." },
    ], galleryFilters: ["All work", "Interiors", "Exteriors"],
  },
];

export function getArtisanProfile(id: number) {
  if (!Number.isInteger(id) || id < 1 || id > 25) return undefined;
  const base = artisanProfiles[(id - 1) % artisanProfiles.length];
  return { ...base, id };
}
