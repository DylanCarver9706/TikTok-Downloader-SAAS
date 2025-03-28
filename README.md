# Subscription-Based SAAS Application Template

A modern web application built with Next.js that provides PDF utilities with an Ads access model.

## Tech Stack

- **Frontend**: Next.js
- **Analytics**: PostHog

## Getting Started

To use this template for your own project, follow these steps:

1. Clone the repository to your local machine
2. Delete the `.git` directory
3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   # PostHog Analytics
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
   POSTHOG_HOST=https://us.i.posthog.com
   ```

   To get this key:

   - **PostHog**: Visit https://us.posthog.com, go to Settings > Project Details to get the project API key

4. Install dependencies:

   ```bash
   npm install
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Check for build issues:

   ```bash
   npm run build
   ```

7. Check for build issues:

   ```bash
   npm run build
   ```

8. Set up your remote repository:
   ```bash
   # First, create a new repository on GitHub.com
   # Then run these commands:
   git init
   git remote add origin https://github.com/username/your-repo-name.git
   git branch -M main
   # Add and commit your code
   git push -u origin main
   ```

## Features

- PDF utilities
- Analytics tracking
- Modern, responsive UI

## License

This project is available as a template for building your own SAAS applications.
