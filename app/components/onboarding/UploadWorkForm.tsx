"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CameraIcon, FileUploadIcon } from "../icons";

type MediaKind = "photo" | "video";
type MediaItem = {
  id: string;
  name: string;
  url: string;
  kind: MediaKind;
  category: string;
  addedAt: number;
};

const serviceCategories = [
  "Corporate outfits",
  "Native wears",
  "Alterations",
  "Bridal wear",
];

const selectClassName =
  "w-full rounded-xl border border-[#D7E0D9] bg-white px-4 py-3.5 text-sm text-[#445247] outline-none focus:border-[#346739] focus:ring-2 focus:ring-[#346739]/10";

export default function UploadWorkForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | MediaKind>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  const chooseFiles = (files: FileList | null) => {
    if (!files) return;
    setPendingFiles(
      Array.from(files).filter(
        (file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
      ),
    );
  };

  const addMedia = async () => {
    if (!pendingFiles.length || !category) return;
    const uploaded = await Promise.all(
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
    setMedia((current) => [...current, ...uploaded]);
    setPendingFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const photoCount = media.filter((item) => item.kind === "photo").length;
  const videoCount = media.filter((item) => item.kind === "video").length;
  const visibleMedia = media
    .filter((item) => typeFilter === "all" || item.kind === typeFilter)
    .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
    .sort((a, b) =>
      sortOrder === "recent" ? b.addedAt - a.addedAt : a.addedAt - b.addedAt,
    );

  const filterButtons = [
    { label: `All (${media.length})`, value: "all" as const },
    { label: `Videos (${videoCount})`, value: "video" as const },
    { label: `Photos (${photoCount})`, value: "photo" as const },
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!media.length) return;
        router.push("/artisan/onboarding/contact");
      }}
      className="mx-auto max-w-[1050px] pb-14"
    >
      <div className="flex flex-col gap-7 border-b border-[#E4EBE6] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/artisan/onboarding/services")}
            aria-label="Go back to services and skills"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D7E0D9] text-xl text-[#293A2D] transition hover:bg-[#F5FFF9]"
          >
            ‹
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6D8772]">
              Step 3 of 5
            </p>
            <h1 className="mt-2 text-[18px] font-bold text-[#293A2D] sm:text-3xl">
              Upload Your Work
            </h1>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#718075]">
              Showcase your best photos and videos so clients can see the quality of your work.
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[300px]">
          <div className="h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
            <div className="h-full w-3/5 rounded-full bg-[#346739]" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-[#346739]">
            60% complete
          </p>
        </div>
      </div>

      <section className="space-y-6 border-b border-[#E4EBE6] py-8">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            chooseFiles(event.dataTransfer.files);
          }}
          className="flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B8C9BC] bg-[#FAFCFA] px-5 text-center transition hover:border-[#346739] hover:bg-[#F5FFF9]"
        >
          <CameraIcon />
          <p className="mt-5 text-sm font-bold text-[#293A2D] sm:text-base">
            Drag photos or videos here or click to browse
          </p>
          <p className="mt-2 text-xs leading-5 text-[#718075]">
            Supported formats: JPG, JPEG, PNG, WEBP, MP4, MOV and WEBM
          </p>
          {pendingFiles.length > 0 && (
            <p className="mt-4 rounded-full bg-[#E8F8ED] px-4 py-2 text-xs font-semibold text-[#346739]">
              {pendingFiles.length} {pendingFiles.length === 1 ? "file" : "files"} selected
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
            multiple
            className="sr-only"
            onChange={(event) => chooseFiles(event.target.files)}
          />
        </div>

        <div className="w-full space-y-3 md:w-1/2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#293A2D]">
              Assign service category<span className="ml-0.5 text-[#346739]">*</span>
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={selectClassName}
            >
              <option value="" disabled>Select a service category</option>
              {serviceCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={addMedia}
            className="w-full rounded-xl border border-[#346739] px-6 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#346739] hover:text-white"
          >
            Add image
          </button>
        </div>
      </section>

      <section className="py-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#293A2D]">My work</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {filterButtons.map((button) => (
                <button
                  key={button.value}
                  type="button"
                  onClick={() => setTypeFilter(button.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${typeFilter === button.value ? "bg-[#346739] text-white" : "bg-[#F0F3F1] text-[#445247] hover:bg-[#E4EBE6]"}`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:w-[460px]">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by service category"
              className={selectClassName}
            >
              <option value="all">All service categories</option>
              {serviceCategories.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as "recent" | "oldest")}
              aria-label="Sort media"
              className={selectClassName}
            >
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
                  <button
                    type="button"
                    onClick={() => setMedia((current) => current.filter((mediaItem) => mediaItem.id !== item.id))}
                    aria-label={`Remove ${item.name}`}
                    className="text-lg leading-none text-[#718075] hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CFD8D1] bg-[#FAFCFA] px-5 text-center">
            <FileUploadIcon />
            <p className="mt-4 text-sm font-bold text-[#293A2D]">No media has been uploaded yet</p>
            <p className="mt-1 text-xs text-[#718075]">
              Your uploaded photos and videos will appear here.
            </p>
          </div>
        )}
        {!media.length && <p className="mt-2 text-xs text-[#8B968D]">At least one work sample is required.</p>}
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#E4EBE6] pt-7 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/artisan/onboarding/services")}
          className="w-full rounded-xl border border-[#D7E0D9] px-8 py-3.5 text-sm font-bold text-[#445247] transition hover:bg-[#F5FFF9] sm:w-auto"
        >
          Go back
        </button>
        <button
          type="submit"
          className="w-full rounded-xl border border-[#346739] bg-transparent px-8 py-3.5 text-sm font-bold text-[#346739] transition hover:bg-[#346739] hover:text-white sm:w-auto"
        >
          Save and Proceed
        </button>
      </div>
    </form>
  );
}
