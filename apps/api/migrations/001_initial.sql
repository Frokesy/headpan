create extension if not exists pgcrypto;

create type user_role as enum ('client', 'artisan', 'admin');
create type verification_status as enum ('draft', 'pending', 'approved', 'rejected');
create type media_kind as enum ('photo', 'video');

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text not null unique,
  password_hash text not null,
  role user_role not null default 'artisan',
  email_verified_at timestamptz,
  phone_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table artisan_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  business_name text,
  profession text,
  tagline text,
  about text,
  state text,
  shop_address text,
  has_physical_shop boolean not null default false,
  years_experience integer check (years_experience >= 0),
  profile_image_url text,
  cover_image_url text,
  shop_image_url text,
  profile_completion integer not null default 0 check (profile_completion between 0 and 100),
  public_visible boolean not null default true,
  custom_requests_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references artisan_profiles(id) on delete cascade,
  name text not null,
  description text not null,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references artisan_profiles(id) on delete cascade,
  name text not null,
  unique (artisan_id, name)
);

create table work_media (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references artisan_profiles(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  kind media_kind not null,
  storage_key text not null,
  public_url text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table availability (
  artisan_id uuid primary key references artisan_profiles(id) on delete cascade,
  working_days smallint[] not null default '{}',
  starts_at time,
  ends_at time,
  home_service boolean not null default false,
  emergency_available boolean not null default false
);

create table artisan_reasons (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references artisan_profiles(id) on delete cascade,
  reason text not null,
  sort_order integer not null default 0
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references artisan_profiles(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_artisan_idx on services(artisan_id);
create index work_media_artisan_idx on work_media(artisan_id, created_at desc);
create index faqs_artisan_idx on faqs(artisan_id, sort_order);
