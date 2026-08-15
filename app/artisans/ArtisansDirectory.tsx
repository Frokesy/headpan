"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HeartIcon,
  LocationIcon,
  SearchIcon,
  StarIcon,
} from "../components/icons";
import { ProTag, VerifiedTag } from "../components/tags";

type Artisan = {
  id: number;
  name: string;
  role: string;
  category: string;
  location: string;
  availability: "Available now" | "Available this week" | "Unavailable";
  badges: ("Verified" | "Pro")[];
  description: string;
  rating: number;
  bgImage: string;
  avatar: string;
};

type FilterKey = "categories" | "locations" | "availability" | "badges" | "ratings";

const baseArtisans: Omit<Artisan, "id">[] = [
  {
    name: "Segun Adewale",
    role: "Master Barber",
    category: "Barbing",
    location: "Lagos, Nigeria",
    availability: "Available now",
    badges: ["Verified", "Pro"],
    description: "Specializes in modern cuts and grooming with 8+ years of experience.",
    rating: 4.9,
    bgImage: "/artisans/barber.jpg",
    avatar: "/artisans/avatars/barber-segun.png",
  },
  {
    name: "Mercy Okafor",
    role: "Professional Baker",
    category: "Baking",
    location: "Abuja, Nigeria",
    availability: "Available this week",
    badges: ["Verified"],
    description: "Artisan baker creating custom cakes and pastries for every occasion.",
    rating: 4.8,
    bgImage: "/artisans/cake.jpg",
    avatar: "/artisans/avatars/cake-mercy.png",
  },
  {
    name: "Omotunde James",
    role: "Fashion Designer",
    category: "Fashion & Tailoring",
    location: "Lagos, Nigeria",
    availability: "Available now",
    badges: ["Verified", "Pro"],
    description: "Crafting bespoke clothing with premium fabrics and attention to detail.",
    rating: 4.9,
    bgImage: "/artisans/designer.jpg",
    avatar: "/artisans/avatars/designer-omotunde.png",
  },
  {
    name: "Chioma Nwosu",
    role: "Hair Stylist",
    category: "Hair Styling",
    location: "Port Harcourt, Nigeria",
    availability: "Available this week",
    badges: ["Pro"],
    description: "Expert in natural hair care, braiding, and protective styling.",
    rating: 4.7,
    bgImage: "/artisans/hairstylist.jpg",
    avatar: "/artisans/avatars/hairstylist-chioma.png",
  },
  {
    name: "Ayomide Bello",
    role: "Professional Painter",
    category: "Painting",
    location: "Ibadan, Nigeria",
    availability: "Unavailable",
    badges: ["Verified"],
    description: "Residential and commercial painting services with quality finishes.",
    rating: 4.6,
    bgImage: "/artisans/painter.jpg",
    avatar: "/artisans/avatars/painter-ayomide.png",
  },
];

const artisans: Artisan[] = Array.from({ length: 5 }, (_, groupIndex) =>
  baseArtisans.map((artisan, artisanIndex) => ({
    ...artisan,
    id: groupIndex * baseArtisans.length + artisanIndex + 1,
  }))
).flat();

const filterGroups: { key: FilterKey; title: string; options: string[] }[] = [
  {
    key: "categories",
    title: "Category",
    options: ["Fashion & Tailoring", "Barbing", "Hair Styling", "Painting", "Baking"],
  },
  {
    key: "locations",
    title: "Location",
    options: ["Lagos, Nigeria", "Abuja, Nigeria", "Ibadan, Nigeria", "Port Harcourt, Nigeria"],
  },
  {
    key: "availability",
    title: "Availability",
    options: ["Available now", "Available this week", "Unavailable"],
  },
  { key: "badges", title: "Badges", options: ["Verified", "Pro"] },
  {
    key: "ratings",
    title: "Rating",
    options: ["4.5 & above", "4.0 & above", "3.5 & above"],
  },
];

const ITEMS_PER_PAGE = 6;
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "name", label: "Name: A–Z" },
];

const ViewToggle = ({
  viewMode,
  onChange,
}: {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}) => (
  <div className="flex items-center gap-1 rounded-lg border border-[#D8E6DC] bg-white p-1">
    <button
      type="button"
      aria-label="Show artisans in a grid"
      aria-pressed={viewMode === "grid"}
      onClick={() => onChange("grid")}
      className={`rounded-md p-2 ${viewMode === "grid" ? "bg-[#346739] text-white" : "text-[#346739]"}`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    </button>
    <button
      type="button"
      aria-label="Show artisans in a list"
      aria-pressed={viewMode === "list"}
      onClick={() => onChange("list")}
      className={`rounded-md p-2 ${viewMode === "list" ? "bg-[#346739] text-white" : "text-[#346739]"}`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="2" width="14" height="3" rx="1" />
        <rect x="1" y="7" width="14" height="3" rx="1" />
        <rect x="1" y="12" width="14" height="3" rx="1" />
      </svg>
    </button>
  </div>
);

const ArtisansDirectory = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobilePanel, setMobilePanel] = useState<"filters" | "sort" | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, string[]>>({
    categories: [],
    locations: [],
    availability: [],
    badges: [],
    ratings: [],
  });

  const toggleFilter = (key: FilterKey, option: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(option)
        ? current[key].filter((item) => item !== option)
        : [...current[key], option],
    }));
    setPage(1);
  };

  const filteredArtisans = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const ratingThresholds = filters.ratings.map((rating) =>
      Number.parseFloat(rating)
    );

    return artisans.filter((artisan) => {
      const matchesSearch =
        !searchTerm ||
        artisan.name.toLowerCase().includes(searchTerm) ||
        artisan.role.toLowerCase().includes(searchTerm) ||
        artisan.category.toLowerCase().includes(searchTerm);
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(artisan.category);
      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.includes(artisan.location);
      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.includes(artisan.availability);
      const matchesBadge =
        filters.badges.length === 0 ||
        filters.badges.some((badge) => artisan.badges.includes(badge as "Verified" | "Pro"));
      const matchesRating =
        ratingThresholds.length === 0 ||
        ratingThresholds.some((rating) => artisan.rating >= rating);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesAvailability &&
        matchesBadge &&
        matchesRating
      );
    });
  }, [filters, search]);

  const pageCount = Math.max(1, Math.ceil(filteredArtisans.length / ITEMS_PER_PAGE));
  const sortedArtisans = useMemo(() => {
    const results = [...filteredArtisans];
    if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") results.sort((a, b) => a.name.localeCompare(b.name));
    return results;
  }, [filteredArtisans, sortBy]);
  const visibleArtisans = sortedArtisans.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setFilters({ categories: [], locations: [], availability: [], badges: [], ratings: [] });
    setPage(1);
  };

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <main className="bg-[#F8FBF9] py-10 lg:py-16">
      <div className="mx-auto w-[90%]">
        <div className="mb-3 flex items-center justify-between gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-expanded={mobilePanel === "filters"}
              onClick={() => setMobilePanel((panel) => (panel === "filters" ? null : "filters"))}
              className={`rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${
                mobilePanel === "filters"
                  ? "border-[#346739] bg-[#346739] text-white"
                  : "border-[#D8E6DC] bg-white text-[#346739]"
              }`}
            >
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
            <button
              type="button"
              aria-expanded={mobilePanel === "sort"}
              onClick={() => setMobilePanel((panel) => (panel === "sort" ? null : "sort"))}
              className={`rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${
                mobilePanel === "sort"
                  ? "border-[#346739] bg-[#346739] text-white"
                  : "border-[#D8E6DC] bg-white text-[#346739]"
              }`}
            >
              Sort by
            </button>
          </div>
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>

        <p className="mb-5 text-[13px] text-gray-600 lg:hidden">
          <span className="font-semibold text-[#2B392D]">{filteredArtisans.length}</span>{" "}
          artisans found
        </p>

        <div
          className={`mb-5 rounded-[20px] bg-white p-5 shadow-sm lg:hidden ${
            mobilePanel === "sort" ? "block" : "hidden"
          }`}
        >
          <fieldset className="space-y-3">
            <legend className="mb-3 text-[14px] font-semibold text-[#2B392D]">Sort by</legend>
            {sortOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-3 text-[13px] text-gray-600">
                <input
                  type="radio"
                  name="mobile-sort"
                  checked={sortBy === option.value}
                  onChange={() => {
                    setSortBy(option.value);
                    setPage(1);
                    setMobilePanel(null);
                  }}
                  className="h-4 w-4 accent-[#346739]"
                />
                {option.label}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <aside
            className={`w-full rounded-[20px] bg-white p-5 shadow-sm lg:sticky lg:top-5 lg:block lg:w-[24%] ${
              mobilePanel === "filters" ? "block" : "hidden"
            }`}
          >
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon width={16} height={16} />
              </div>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search name or service"
                aria-label="Search artisans by name or service"
                className="w-full rounded-xl border border-[#D8E6DC] py-3 pl-11 pr-4 text-[13px] outline-none transition-colors placeholder:text-gray-400 focus:border-[#346739]"
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-semibold text-[#2B392D]">Filters</h2>
              {(activeFilterCount > 0 || search) && (
                <button type="button" onClick={clearFilters} className="text-[12px] font-semibold text-[#346739]">
                  Clear all
                </button>
              )}
            </div>

            {filterGroups.map((group) => (
              <fieldset key={group.key} className="border-b border-gray-100 py-5 last:border-0 last:pb-0">
                <legend className="mb-3 text-[14px] font-semibold text-[#2B392D]">
                  {group.title}
                </legend>
                <div className="space-y-3">
                  {group.options.map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-3 text-[13px] text-gray-600">
                      <input
                        type="checkbox"
                        checked={filters[group.key].includes(option)}
                        onChange={() => toggleFilter(group.key, option)}
                        className="h-4 w-4 cursor-pointer accent-[#346739]"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </aside>

          <section className="w-full lg:w-[73%]" aria-live="polite">
            <div className="mb-5 flex items-center justify-between">
              <p className="hidden text-[14px] text-gray-600 lg:block">
                <span className="font-semibold text-[#2B392D]">{filteredArtisans.length}</span>{" "}
                artisans found
              </p>
              <div className="hidden items-center gap-2 lg:flex">
                <label className="flex items-center gap-2 text-[12px] text-gray-500">
                  <span>Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value);
                      setPage(1);
                    }}
                    className="rounded-lg border border-[#D8E6DC] bg-white px-3 py-2 text-[12px] font-semibold text-[#346739] outline-none focus:border-[#346739]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
              </div>
            </div>

            {visibleArtisans.length > 0 ? (
              <div
                className={`grid grid-cols-1 gap-5 ${
                  viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : ""
                }`}
              >
                {visibleArtisans.map((artisan) => (
                  <article
                    key={artisan.id}
                    className={`overflow-hidden rounded-[20px] bg-white shadow-md ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative bg-cover bg-center ${
                        viewMode === "list"
                          ? "min-h-[230px] w-[40%] shrink-0 sm:w-[32%]"
                          : "h-[180px] w-full"
                      }`}
                      style={{ backgroundImage: `url('${artisan.bgImage}')` }}
                    >
                      <div className={`flex items-center justify-between pt-6 ${viewMode === "list" ? "px-2" : "px-6"}`}>
                        <div className="flex items-center gap-1">
                          {artisan.badges.includes("Verified") && <VerifiedTag />}
                          {artisan.badges.includes("Pro") && <ProTag />}
                        </div>
                        <HeartIcon />
                      </div>
                      <div
                        className={`absolute z-10 w-full px-3 ${
                          viewMode === "list"
                            ? "bottom-3 left-0"
                            : "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                        }`}
                      >
                        <div className={`flex w-full ${viewMode === "list" ? "flex-col items-start gap-2" : "items-center justify-between"}`}>
                          <img
                            src={artisan.avatar}
                            alt={artisan.name}
                            className={`rounded-full border-4 border-white object-cover ${
                              viewMode === "list" ? "h-[58px] w-[58px]" : "h-[80px] w-[80px]"
                            }`}
                          />
                          <div className="flex items-center space-x-1 rounded-full bg-white px-2 py-1 shadow-md">
                            <StarIcon />
                            <span className="text-xs font-semibold">{artisan.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex flex-col space-y-2 px-4 pb-4 ${
                        viewMode === "list" ? "w-[60%] justify-center pt-4 sm:w-[68%]" : "pt-12"
                      }`}
                    >
                      <div>
                        <h2 className="text-[16px] font-semibold text-[#346739]">{artisan.name}</h2>
                        <p className="mt-1 text-[14px] text-gray-600">{artisan.role}</p>
                        <div className="mt-1 flex items-center space-x-1">
                          <LocationIcon width={10} height={12} />
                          <span className="text-[12px] text-gray-500">{artisan.location}</span>
                        </div>
                      </div>
                      <p className="min-h-9 text-[12px] text-gray-500">{artisan.description}</p>
                      <Link href={`/artisans/${artisan.id}`} className="mt-4 block w-full rounded-xl border border-[#346739] py-2 text-center text-[14px] font-semibold text-[#345739] transition hover:bg-[#346739] hover:text-white">
                        View Profile
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[20px] bg-white px-6 text-center shadow-sm">
                <h2 className="text-[20px] font-semibold text-[#346739]">No artisans found</h2>
                <p className="mt-2 text-[14px] text-gray-500">Try changing your search or clearing some filters.</p>
                <button type="button" onClick={clearFilters} className="mt-5 rounded-xl bg-[#346739] px-5 py-2 text-[13px] font-semibold text-white">
                  Clear filters
                </button>
              </div>
            )}

            {filteredArtisans.length > 0 && pageCount > 1 && (
              <nav aria-label="Artisan results pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-[#D8E6DC] bg-white px-4 py-2 text-[13px] font-semibold text-[#346739] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={page === pageNumber ? "page" : undefined}
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 w-9 rounded-lg text-[13px] font-semibold ${
                      page === pageNumber
                        ? "bg-[#346739] text-white"
                        : "border border-[#D8E6DC] bg-white text-[#346739]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={page === pageCount}
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  className="rounded-lg border border-[#D8E6DC] bg-white px-4 py-2 text-[13px] font-semibold text-[#346739] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ArtisansDirectory;
