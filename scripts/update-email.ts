import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function updateEmail() {
  await sql`UPDATE users SET email = 'ai@autolab.cloud' WHERE email = 'admin@aifengge.com'`;
  console.log("✅ Email updated to ai@autolab.cloud");

  const users = await sql`SELECT id, name, email FROM users`;
  console.log("Current users:", users);
}

updateEmail();
