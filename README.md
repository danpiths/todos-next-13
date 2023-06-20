# Todos App (Next.js 13)

A basic todo app, that enables you to write descriptions for todos and categorise them. Everything is synchronised real-time and is accessible anywhere.

[Visit Website](https://todos-next-13-by-danpiths.vercel.app)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Tech/Libraries Used in the project,

- [Next.js 13](https://nextjs.org) (with [TypeScript](https://www.typescriptlang.org) and [Tailwind CSS](https://tailwindcss.com)) as a [React](https://react.dev) framework to take advantage of React Server Components (RSCs) and also to make deploying on edge easy.
- [PlanetScale](https://planetscale.com) for hosting MySQL database as PlanetScale is very scalable (with the help of vitess) and also because it measures usage on number of reads and writes rather than execution time.
- [Drizzle](https://orm.drizzle.team) as the ORM to connect to MySQL database, makes exactly one call to the database for each query (unlike Prisma that reads mutiple tables and combines data on its own) and is also edge-ready with no cold-starts. Makes the application feel super responsive. Also great sense of humour.
- [Drizzle-kit](https://orm.drizzle.team/kit-docs/overview) for SQL Schema Migrations (push or pull a schema to/from database)
- [Clerk](https://clerk.com) as authentication provider as it is edge ready.
- [shadcn/ui](https://ui.shadcn.com) component library for components styling that is opinionated but also could be modified as granularly as needed (uses [Radix UI](https://www.radix-ui.com) under the hood)
- [Zod](https://zod.dev) for env schema validation (used along with [T3 Env](https://env.t3.gg) library for typesafe environment variable handling)

![desktop-light](https://github.com/danpiths/todos-next-13/assets/85949566/eefb178d-5dc9-4639-969c-cb615e97d859)

![desktop-dark](https://github.com/danpiths/todos-next-13/assets/85949566/22d4b26b-0dbf-497b-86c3-4cc6b228a86d)

![todo-desktop-light](https://github.com/danpiths/todos-next-13/assets/85949566/83314390-0cef-4ed0-a32d-7c2cf5d09cba)

![todo-desktop-dark](https://github.com/danpiths/todos-next-13/assets/85949566/4b1530eb-b199-4df6-b56e-de40f9fe5646)

![mobile-light](https://github.com/danpiths/todos-next-13/assets/85949566/31c0143d-5828-489c-bdac-7f9cfa702ecc)

![mobile-dark](https://github.com/danpiths/todos-next-13/assets/85949566/ef7ffd44-aaf9-4802-901a-08c4809c8411)

![todo-mobile-light](https://github.com/danpiths/todos-next-13/assets/85949566/a000859d-80ca-4ff8-b50b-bb66755c4cbe)

![todo-mobile-dark](https://github.com/danpiths/todos-next-13/assets/85949566/81a91494-d98f-4b21-a290-ba9a1d343c35)

## Run Locally

1. Clone the repository

```bash
git clone https://github.com/danpiths/todos-next-13.git
```

2. Open a terminal in the cloned folder
3. Install required packages

```bash
pnpm install
```

4. copy the `.env.example` to `.env` and populate the environment variables from respective sources (all instructions should be clear in `.env.example` file)

5.  Synchronise the schema and database

```bash
pnpm run drizzle:push
```

6. Run the app

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
