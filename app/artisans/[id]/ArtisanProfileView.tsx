"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "../../components/icons";
import { ProTag, VerifiedTag } from "../../components/tags";
import { artisanProfiles, type ArtisanProfile } from "../profileData";

type Tab = "About" | "Services" | "Work gallery" | "Reviews" | "FAQ";

const reviews = [
  {
    name: "Chidinma Okeke",
    location: "Lagos, Nigeria",
    rating: 5,
    time: "2 days ago",
    text: "Exceptional work and great attention to detail. Everything was delivered exactly as discussed and right on time.",
    avatar: "/artisans/avatars/cake-mercy.png",
  },
  {
    name: "Daniel Ibrahim",
    location: "Abuja, Nigeria",
    rating: 5,
    time: "2 weeks ago",
    text: "Very professional, easy to communicate with and the final result exceeded my expectations. I would happily book again.",
    avatar: "/artisans/avatars/barber-segun.png",
  },
  {
    name: "Amaka Eze",
    location: "Lekki, Lagos",
    rating: 4,
    time: "1 month ago",
    text: "A smooth experience from the first message to delivery. The workmanship was neat and thoughtfully executed.",
    avatar: "/artisans/avatars/hairstylist-chioma.png",
  },
  {
    name: "Tobi Martins",
    location: "Ikeja, Lagos",
    rating: 5,
    time: "2 months ago",
    text: "Reliable, friendly and highly skilled. I especially appreciated the useful recommendations throughout the project.",
    avatar: "/artisans/avatars/designer-omotunde.png",
  },
];

const faqs = [
  [
    "How far in advance should I book?",
    "For the best availability, book at least three to seven days ahead. Urgent requests can still be discussed.",
  ],
  [
    "Do you offer home services?",
    "Yes, home service is available within the city. Transport costs depend on your location.",
  ],
  [
    "How do I get an accurate quote?",
    "Send a message with your requirements, preferred date and reference photos where applicable.",
  ],
  [
    "What payment methods do you accept?",
    "Payment can be agreed securely after the scope, timeline and final quote are confirmed.",
  ],
];

const galleryImages = [
  "/artisans/designer.jpg",
  "/artisans/hairstylist.jpg",
  "/artisans/cake.jpg",
  "/artisans/barber.jpg",
  "/artisans/painter.jpg",
  "/service_imgs/tailoring.png",
  "/service_imgs/painting.png",
  "/service_imgs/hairstyling.png",
  "/service_imgs/barbing.png",
];

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-[#F5A623]" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-[#E5EEE7] py-3 last:border-0">
      <span className="mt-0.5 text-base">{icon}</span>
      <div>
        <p className="text-[11px] text-[#718075]">{label}</p>
        <p className="text-[13px] font-semibold text-[#293A2D]">{value}</p>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="rounded-2xl border border-[#E2ECE4] bg-white p-5">
      <div className="flex items-center gap-4">
        <img
          src={review.avatar}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-semibold">{review.name}</h4>
          <p className="text-xs text-[#718075]">{review.location}</p>
        </div>
      </div>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#4F6552]">{review.text}</p>
      <p className="mt-4 text-xs text-[#8A968C]">{review.time}</p>
    </article>
  );
}

export default function ArtisanProfileView({
  artisan,
}: {
  artisan: ArtisanProfile;
}) {
  const [tab, setTab] = useState<Tab>("About");
  const [galleryFilter, setGalleryFilter] = useState(artisan.galleryFilters[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const tabs: Tab[] = ["About", "Services", "Work gallery", "Reviews", "FAQ"];
  const related = artisanProfiles
    .filter((item) => item.id !== ((artisan.id - 1) % 5) + 1)
    .slice(0, 4);
  const featuredImages = [
    artisan.cover,
    ...galleryImages.filter((image) => image !== artisan.cover).slice(0, 4),
  ];

  return (
    <main className="bg-[#F8FBF8] text-[#293A2D]">
      <section className="mx-auto grid max-w-[1440px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-10 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(43,57,45,0.08)] lg:sticky lg:top-5">
          <div
            className="relative h-32 bg-cover bg-center"
            style={{ backgroundImage: `url('${artisan.cover}')` }}
          >
            <div className="flex justify-between p-4">
              <div className="flex gap-1">
                <VerifiedTag />
                <ProTag />
              </div>
              <HeartIcon />
            </div>
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="absolute left-1/2 -bottom-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
          <div className="px-5 pb-6 pt-10 text-center">
            <h1 className="text-xl font-bold text-[#346739]">{artisan.name}</h1>
            <p className="mt-1 text-sm font-medium">{artisan.role}</p>
            <p className="mt-3 text-xs leading-5 text-[#718075]">
              {artisan.description}
            </p>
            <div className="mt-5 text-left">
              <DetailRow icon="⌖" label="Location" value={artisan.location} />
              <DetailRow
                icon="◷"
                label="Member since"
                value={artisan.memberSince}
              />
              <DetailRow
                icon="▣"
                label="Business name"
                value={artisan.business}
              />
              <DetailRow
                icon="◆"
                label="Years of experience"
                value={artisan.experience}
              />
              <DetailRow
                icon="↗"
                label="Response time"
                value={artisan.responseTime}
              />
              <DetailRow
                icon="✓"
                label="Verification"
                value="Background checked"
              />
            </div>
            <div className="mt-5 grid gap-2">
              <button className="rounded-xl bg-[#346739] px-4 py-3 text-sm font-semibold text-white">
                Message
              </button>
              <button className="rounded-xl border border-[#346739] px-4 py-3 text-sm font-semibold text-[#346739]">
                Contact me
              </button>
            </div>
            <div className="mt-7 border-t border-[#E5EEE7] pt-5 text-left">
              <h2 className="text-sm font-bold">Client reviews</h2>
              <div className="mt-4 flex gap-5">
                <div className="shrink-0 text-center">
                  <p className="text-3xl font-bold">{artisan.rating}</p>
                  <Stars />
                  <p className="mt-1 text-[10px] text-[#718075]">126 reviews</p>
                </div>
                <div className="w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map((score, index) => (
                    <div
                      key={score}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <span>{score}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E9EEE9]">
                        <div
                          className="h-full rounded-full bg-[#F5A623]"
                          style={{ width: `${[82, 12, 4, 1, 1][index]}%` }}
                        />
                      </div>
                      <span>{[103, 15, 5, 2, 1][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <h2 className="mb-4 text-2xl font-bold text-[#346739]">
            Featured work
          </h2>
          <div className="grid h-[480px] grid-cols-1 gap-3 overflow-hidden rounded-3xl sm:grid-cols-2 sm:grid-rows-2">
            <img
              src={featuredImages[0]}
              alt={`${artisan.name} featured work`}
              className="h-full w-full object-cover sm:row-span-2"
            />
            <img
              src={featuredImages[1]}
              alt="Featured work"
              className="h-full w-full object-cover"
            />
            <div className="grid grid-cols-2 gap-3 overflow-hidden">
              <img
                src={featuredImages[2]}
                alt="Featured work"
                className="h-full w-full object-cover"
              />
              <div className="relative">
                <img
                  src={featuredImages[3]}
                  alt="Featured work"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setTab("Work gallery")}
                  className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white"
                >
                  View all work →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
            <div className="min-w-0 rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(43,57,45,0.06)] sm:p-7">
              <div className="flex gap-1 overflow-x-auto border-b border-[#DDE8DF]">
                {tabs.map((item) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition ${tab === item ? "border-[#346739] text-[#346739]" : "border-transparent text-[#718075]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="pt-7">
                {tab === "About" && (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold">
                        About {artisan.name.split(" ")[0]}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#4F6552]">
                        {artisan.description} Every project begins with a clear
                        conversation about your needs, budget and timeline. My
                        goal is to deliver dependable service and work you will
                        be proud to recommend.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-xl font-bold">Skills & expertise</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {artisan.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#F0FFF6] px-4 py-2 text-xs font-semibold text-[#346739]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                    <section>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Client reviews</h3>
                        <button
                          onClick={() => setTab("Reviews")}
                          className="text-xs font-semibold text-[#346739]"
                        >
                          Show all reviews →
                        </button>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {reviews.slice(0, 2).map((review) => (
                          <ReviewCard key={review.name} review={review} />
                        ))}
                      </div>
                    </section>
                  </div>
                )}
                {tab === "Services" && (
                  <div>
                    <h3 className="text-xl font-bold">My services</h3>
                    <p className="mt-2 text-sm text-[#718075]">
                      Professional services tailored to your needs.
                    </p>
                    <div className="mt-5 divide-y divide-[#E2ECE4]">
                      {artisan.services.map((service) => (
                        <div
                          key={service.name}
                          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="mt-1 text-sm text-[#718075]">
                              {service.description}
                            </p>
                          </div>
                          <button className="shrink-0 rounded-xl border border-[#346739] px-4 py-2 text-xs font-semibold text-[#346739]">
                            Request a quote
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#F0FFF6] p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-semibold">
                          Don&apos;t see what you need?
                        </h4>
                        <p className="mt-1 text-sm text-[#718075]">
                          Send me a message and let&apos;s discuss your needs.
                        </p>
                      </div>
                      <button className="shrink-0 rounded-xl bg-[#346739] px-5 py-3 text-xs font-semibold text-white">
                        Message me
                      </button>
                    </div>
                  </div>
                )}
                {tab === "Work gallery" && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {artisan.galleryFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setGalleryFilter(filter)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${galleryFilter === filter ? "bg-[#346739] text-white" : "bg-[#F0FFF6] text-[#346739]"}`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                      {galleryImages
                        .slice(
                          galleryFilter === artisan.galleryFilters[0] ? 0 : 2,
                          galleryFilter === artisan.galleryFilters[0] ? 9 : 8,
                        )
                        .map((image, index) => (
                          <img
                            key={`${galleryFilter}-${image}`}
                            src={image}
                            alt={`${galleryFilter} example ${index + 1}`}
                            className="aspect-square w-full rounded-2xl object-cover"
                          />
                        ))}
                    </div>
                  </div>
                )}
                {tab === "Reviews" && (
                  <div>
                    <div className="mb-5 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Reviews ({reviews.length})</h3>
                        <p className="mt-1 text-sm text-[#718075]">
                          What clients say about working with{" "}
                          {artisan.name.split(" ")[0]}.
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {reviews.map((review) => (
                        <ReviewCard key={review.name} review={review} />
                      ))}
                    </div>
                  </div>
                )}
                {tab === "FAQ" && (
                  <div>
                    <h3 className="text-xl font-bold">
                      Frequently asked questions
                    </h3>
                    <p className="mt-2 text-sm text-[#718075]">
                      Quick answers before you book.
                    </p>
                    <div className="mt-5 space-y-3">
                      {faqs.map(([question, answer], index) => (
                        <div
                          key={question}
                          className="rounded-2xl border border-[#E2ECE4] p-4"
                        >
                          <button
                            onClick={() =>
                              setOpenFaq(openFaq === index ? null : index)
                            }
                            className="flex w-full items-center justify-between text-left text-sm font-semibold"
                          >
                            <span>{question}</span>
                            <span className="text-xl text-[#346739]">
                              {openFaq === index ? "−" : "+"}
                            </span>
                          </button>
                          {openFaq === index && (
                            <p className="mt-3 border-t border-[#E2ECE4] pt-3 text-sm leading-6 text-[#4F6552]">
                              {answer}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(43,57,45,0.06)]">
              <h3 className="text-lg font-bold">Why choose me</h3>
              <div className="mt-5 space-y-4">
                {[
                  "Verified and background checked",
                  `${artisan.experience} hands-on experience`,
                  "Clear, timely communication",
                  "Quality work and tidy delivery",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E4F7E8] text-xs font-bold text-[#346739]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-xl bg-[#346739] py-3 text-sm font-semibold text-white">
                Contact me
              </button>
              <div className="mt-6 divide-y divide-[#E2ECE4]">
                <DetailRow
                  icon="●"
                  label="Availability"
                  value="Available this week"
                />
                <DetailRow
                  icon="↗"
                  label="Response time"
                  value={artisan.responseTime}
                />
                <div className="pt-4">
                  <p className="text-xs font-semibold">Share this profile</p>
                  <div className="mt-3 flex gap-2">
                    {["f", "𝕏", "in", "↗"].map((icon) => (
                      <button
                        key={icon}
                        aria-label="Share profile"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0FFF6] text-xs font-bold text-[#346739]"
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E2ECE4] bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6B8D70]">
                More professionals
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#346739]">
                Related artisans
              </h2>
            </div>
            <Link
              href="/artisans"
              className="text-sm font-semibold text-[#346739]"
            >
              View all →
            </Link>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/artisans/${item.id}`}
                className="group overflow-hidden rounded-2xl border border-[#E2ECE4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <img
                    src={item.avatar}
                    alt=""
                    className="absolute bottom-0 left-4 h-14 w-14 rounded-full border-3 border-white object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[#346739]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#718075]">{item.role}</p>
                    </div>
                    <span className="text-xs font-bold">{item.rating} ★</span>
                  </div>
                  <p className="mt-3 text-xs text-[#718075]">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
