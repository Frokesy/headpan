"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { CameraIcon, FileUploadIcon } from "../../../components/icons";

type MediaKind = "photo" | "video";
type MediaItem = {
  id: string;
  name: string;
  url: string;
  kind: MediaKind;
  category: string;
  addedAt: number;
};

const categories = [
  "Corporate outfits",
  "Native wears",
  "Alterations",
  "Bridal wear",
];

const selectClass =
  "h-12 w-full rounded-xl border border-[#D7E0D9] bg-white px-4 text-sm text-[#445247] outline-none transition focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

export default function WorkGalleryScreen() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | MediaKind>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  function selectFiles(files: FileList | null) {
    if (!files) return;
    setPendingFiles(
      Array.from(files).filter(
        (file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
      ),
    );
  }

  async function addMedia() {
    if (!pendingFiles.length || !category) return;
    const items = await Promise.all(
      pendingFiles.map(
        (file) =>
          new Promise<MediaItem>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                name: file.name,
                url: String(reader.result),
                kind: file.type.startsWith("video/") ? "video" : "photo",
                category,
                addedAt: Date.now(),
              });
            reader.readAsDataURL(file);
          }),
      ),
    );
    setMedia((current) => [...current, ...items]);
    setPendingFiles([]);
    if (fileInput.current) fileInput.current.value = "";
  }

  const photoCount = media.filter((item) => item.kind === "photo").length;
  const videoCount = media.filter((item) => item.kind === "video").length;
  const visibleMedia = useMemo(
    () =>
      media
        .filter((item) => typeFilter === "all" || item.kind === typeFilter)
        .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
        .sort((a, b) =>
          sortOrder === "recent" ? b.addedAt - a.addedAt : a.addedAt - b.addedAt,
        ),
    [categoryFilter, media, sortOrder, typeFilter],
  );

  const filters = [
    { label: `All (${media.length})`, value: "all" as const },
    { label: `Videos (${videoCount})`, value: "video" as const },
    { label: `Photos (${photoCount})`, value: "photo" as const },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px] pb-10">
      <header>
        <h1 className="text-lg font-semibold text-[#435647] sm:text-xl">
          Showcase your best work and attract more clients.
        </h1>
      </header>

      <section className="mt-6 rounded-2xl border border-[#E2E9E3] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.04)] sm:p-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInput.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") fileInput.current?.click();
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            selectFiles(event.dataTransfer.files);
          }}
          className="flex h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B8C9BC] bg-[#FAFCFA] px-5 text-center transition hover:border-[#346739] hover:bg-[#F5FFF9] sm:h-[300px]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8ED] text-[#346739] [&_svg]:h-6 [&_svg]:w-6 [&_path]:fill-current">
            <CameraIcon />
          </span>
          <p className="mt-5 text-sm font-bold text-[#293A2D] sm:text-base">
            Drag photos or videos here or click to browse
          </p>
          <p className="mt-2 text-xs leading-5 text-[#718075]">
            Supported formats: JPG, JPEG, PNG, WEBP, MP4, MOV and WEBM
          </p>
          {!!pendingFiles.length && (
            <p className="mt-4 rounded-full bg-[#E8F8ED] px-4 py-2 text-xs font-semibold text-[#346739]">
              {pendingFiles.length} {pendingFiles.length === 1 ? "file" : "files"} selected
            </p>
          )}
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
            onChange={(event) => selectFiles(event.target.files)}
            className="sr-only"
          />
        </div>

        <div className="mt-6 w-full space-y-3 md:w-1/2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#293A2D]">
              Assign service category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={selectClass}
            >
              <option value="" disabled>Select a service category</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <button
            type="button"
            disabled={!pendingFiles.length || !category}
            onClick={addMedia}
            className="h-12 w-full rounded-xl bg-[#346739] px-6 text-sm font-bold text-white transition hover:bg-[#29562E] disabled:cursor-not-allowed disabled:bg-[#B8C6BA]"
          >
            Add to my work
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#E2E9E3] bg-white p-4 shadow-[0_7px_24px_rgba(41,58,45,0.04)] sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#293A2D]">My work</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setTypeFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${typeFilter === filter.value ? "bg-[#346739] text-white" : "bg-[#F0F3F1] text-[#445247] hover:bg-[#E4EBE6]"}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:w-[470px]">
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by service category" className={selectClass}>
              <option value="all">All service categories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "recent" | "oldest")} aria-label="Sort work" className={selectClass}>
              <option value="recent">Sort by: Recent</option>
              <option value="oldest">Sort by: Oldest</option>
            </select>
          </div>
        </div>

        {visibleMedia.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleMedia.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-[#E4EBE6] bg-white">
                <div className="relative aspect-[4/3] bg-[#F1F4F2]">
                  {item.kind === "photo" ? (
                    <Image src={item.url} alt={item.name} fill unoptimized className="object-cover" />
                  ) : (
                    <video src={item.url} controls className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <p className="truncate text-xs font-semibold text-[#445247]">{item.category}</p>
                  <button type="button" onClick={() => setMedia((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`} className="text-lg leading-none text-[#718075] hover:text-red-600">×</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CFD8D1] bg-[#FAFCFA] px-5 text-center">
            <span className="text-[#718075] [&_svg]:h-8 [&_svg]:w-8 [&_path]:fill-current"><FileUploadIcon /></span>
            <p className="mt-4 text-sm font-bold text-[#293A2D]">No media has been uploaded yet</p>
            <p className="mt-1 text-xs text-[#718075]">Your uploaded photos and videos will appear here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
