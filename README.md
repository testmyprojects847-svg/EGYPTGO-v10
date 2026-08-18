# EgyptGo — Modular Next.js Travel Platform

A restructured, modular version of the original single-file prototype. All logic that used to
live in `app/page.tsx` now sits in dedicated layers.

## Folder structure

```
app/                    Next.js App Router (real routes, no manual view switching)
  layout.tsx            Providers + Topbar/Footer shell, metadata
  page.tsx              Home (Hero, PopularDestinations, FeaturedTours)
  tours/ destinations/ hotels/ guides/   list + [id] detail routes
  booking/[tourId]/     Checkout flow (customer only)
  auth/                 sign-in, sign-up, forgot-password, reset-password
  dashboard/            Customer dashboard (customer only)
  admin/                Admin dashboard + admin/sign-in
  about/ contact/ not-found.tsx

components/
  layout/     Topbar, Footer, Logo, LanguageToggle, CurrencyToggle, PageHeader, BackLink
  home/       Hero, PopularDestinations, FeaturedTours
  tours/      TourCard, TourGrid, BookingForm
  destinations/ hotels/ guides/  Cards
  reviews/    TourReviews
  auth/       LoginForm, RegisterForm, PasswordRecoveryForm, AuthField, GoogleButton, RequireRole
  admin/      DataTable, Tabs, StatCards, TourForm/TourTable, DestinationForm, HotelForm,
              BookingTable, UserTable, PaymentTable, ReviewModeration
  dashboard/  CustomerDashboard
  ui/         shadcn primitives

data/        tours.ts, destinations.ts, hotels.ts, guides.ts, users.ts, bookings.ts, reviews.ts, articles.ts
types/       user.ts, auth.ts, tour.ts, destination.ts, hotel.ts, guide.ts, booking.ts, review.ts, common.ts
services/    auth/ (authService, passwordService), storage/ (storageService),
             tours/ (tourService), bookings/ (bookingService)
hooks/       useAuth, useTours, useBookings, useFavorites, useReviews, useLanguage,
             useCurrency, useUser, useLocalStorage
providers/   AppProviders, AuthProvider, LanguageProvider, CurrencyProvider
lib/         utils.ts, constants.ts, routes.ts, validation.ts, currency.ts, permissions.ts
messages/    en.json, ar.json (full EN/AR dictionaries)
public/      images/{hero,tours,destinations,hotels,guides}, icons/
```

## Layer rules

- **Components never touch storage.** They call hooks; hooks call services; services own persistence.
- **Data files are seed data only** and are typed by `types/`.
- **Routing is centralized** in `lib/routes.ts` — never hardcode paths.
- **Copy lives in `messages/`** and is read with `useLanguage().t(key)`; keys are type-checked.

## Demo accounts

- Customer: `ahmed@example.com` / `password123`
- Admin: `admin@egyptgo.com` / `admin123` (via `/admin/sign-in`)

## Getting started

```bash
pnpm install   # or npm install / bun install
pnpm dev       # http://localhost:3000
pnpm build
```
