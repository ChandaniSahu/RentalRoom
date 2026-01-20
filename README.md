# Rental Room

## Introduction
Rental Room is a modern web application designed to connect tenants with property owners for finding and listing rental spaces. Built with Next.js, it offers a seamless and responsive experience for searching, viewing, and managing rental properties.

## Live Demo
Check out the live deployment of the application here:
[Live Demo Link](<https://appdost-rentalroom.netlify.app>)

## Local Setup
Follow these steps to get a local copy of Rental Room up and running.

### Prerequisites
*   Node.js (version 18 or higher)
*   npm or yarn
*   Supabase account for database and authentication (required for full functionality)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/ChandaniSahu/RentalRoom.git
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Features
Rental Room provides a robust set of features to manage rental listings:

*   **Property Search:** Advanced search filters to quickly find rooms based on location, price, and property type.
*   **User Authentication:** Secure sign-up and login functionality powered by Supabase.
*   **Property Listings:** Detailed view for individual rooms, including images, price, and amenities.
*   **Dashboard:** A personalized area for property owners to add, edit, and manage their room listings.
*   **Responsive UI:** Fully responsive design for seamless viewing on desktop and mobile devices.
