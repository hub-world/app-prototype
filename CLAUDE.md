# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React + TypeScript prototype for a property management/rental app with a mobile-first design. The app uses a phone frame mockup for desktop viewing and is designed to look like a mobile application.

### Key Technologies

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS 4** + DaisyUI for styling
- **Framer Motion** for animations
- **React Router 7** for navigation
- **Lucide React** for icons

### Application Structure

The app is organized around screens that represent different app views:

- **HomeScreen** - Main dashboard with widgets for amenities, quick actions, and navigation links
- **BookingScreen/BookingFormScreen** - Booking flow for amenities
- **ContractScreen** - Contract information
- **SubleaseScreen** - Subletting functionality
- **ProfileScreen** - User profile
- **WelcomeScreen** - Onboarding
- **SandboxScreen** - Development/testing area

### Component Architecture

- **PhoneFrame** - Wraps the entire app in a mobile phone mockup for desktop
- **Screen** - Base container for all app screens with tab navigation
- **Widgets** - Modular components used on HomeScreen (AmenityWidget, CleaningWidget, MoodWidget, etc.)
- **Money** - Utility component for displaying currency

### Styling Approach

- Uses Tailwind CSS with DaisyUI component library
- Mobile-first responsive design with `xs:` breakpoints for desktop phone frame
- Path alias `~` points to `/src` directory
- Color scheme uses DaisyUI semantic colors (primary, accent, base-100, etc.)

### Animation System

Uses Framer Motion for screen transitions with slide animations between routes. The app tracks initial load state to provide different animation behavior on first render vs navigation.

### Configuration

- `src/config.ts` holds central configuration for the various apartment types, services and the users current booking.
