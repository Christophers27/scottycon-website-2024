# ScottyCon Digital Booklet - Webapp

## Overview

This repository is for the ScottyCon Digital Booklet, meant for the con-goers to use. Ignore the 2024 thing, we will be working with this repo for all future cons. This is a webapp, built with React Next.js, and is hosted on Vercel. It is a progressive web app (PWA), meaning it can be installed on your phone or computer like a native app. 

## Development

To run the app locally, you will need to have Node.js and npm installed. I recommend using node version manager (nvm) to manage your Node.js versions. Once you have Node.js and npm installed, you can clone the repository and install the dependencies with:

```bash
npm install
```

Once the dependencies are installed, you will need to set up your environment variables. Create a `.env` file in the root of the project and add the following variables:

```env
DATABASE_URL=<ask Chris for this>
```

Do not ever place these variables directly in the code, as this is a public repository. Once you have your environment variables set up, you can run the app locally with:

```bash
npm run dev
```

This will start the app on `http://localhost:3000`. You can then open this URL in your browser to view the app.

## Structure

The project is structured as follows:
- `app/`: Contains the code for the various pages of the webapp. We use the Next.js App Router, which makes each folder within `app/` a sub-page within the webapp.
- `components/`: Contains the reusable React components used throughout the app.
- `public/`: Contains static assets such as images and fonts.
- `context/`: Contains the React context providers that allow for global state management across the app.
- `hooks/`: Contains custom React hooks used throughout the app.
- `lib/`: Contains static information for use in the app, such as the list of events.
- `backup/`: Contains scripts for sending out alerts.

## Deployment

The app is deployed on Vercel, meaning that any changes pushed to the `main` branch will automatically be deployed to the live site. Therefore, do not push directly to the `main` branch. Instead, create a new branch for your changes and open a pull request. Once the pull request is approved, it can be merged into `main`, triggering a deployment. Branches are also deployed to Vercel but do not use the main link.
