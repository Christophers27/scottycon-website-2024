import { neon } from "@neondatabase/serverless";
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variables supplied not sufficient.");
}
const sql = neon(process.env.DATABASE_URL);

try {
  // TODO: Could make endpoint_s the primary key
  await sql`CREATE TABLE IF NOT EXISTS Subscriptions (
    id SERIAL PRIMARY KEY,
    endpoint_s VARCHAR(255) UNIQUE NOT NULL,
    expirationTime TIMESTAMP,
    p256dh VARCHAR (255) UNIQUE NOT NULL,
    auth VARCHAR (255) UNIQUE NOT NULL
  );`;

  await sql`CREATE TABLE IF NOT EXISTS Notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body VARCHAR (255) NOT NULL,
    timeSent TIMESTAMP NOT NULL
  );`;
} catch (err) {
  console.log(err);
}
