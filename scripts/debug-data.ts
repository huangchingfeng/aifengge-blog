import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function debug() {
  // Check users columns
  const userCols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'users'
  `;
  console.log("Users columns:", userCols.map((c: { column_name: string }) => c.column_name));

  // Check sample post
  const posts = await sql`SELECT id, title, slug, status FROM posts LIMIT 3`;
  console.log("\nPosts:", posts);

  // Check specific post
  const chatgptPost = await sql`SELECT id, title, slug, status FROM posts WHERE slug = 'chatgpt-enterprise-use-cases'`;
  console.log("\nChatGPT post:", chatgptPost);
}

debug();
