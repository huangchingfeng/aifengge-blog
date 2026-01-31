import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function checkDatabase() {
  console.log("🔍 檢查資料庫現有資料...\n");

  try {
    // 列出所有表格
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log("📋 現有表格：");
    tables.forEach((t: { table_name: string }) => console.log(`  - ${t.table_name}`));
    console.log();

    // 檢查 posts 表的資料
    try {
      const posts = await sql`SELECT id, title, slug FROM posts LIMIT 10`;
      console.log(`📝 Posts 表 (共 ${posts.length} 筆)：`);
      posts.forEach((p: { id: number; title: string; slug: string }) =>
        console.log(`  - [${p.id}] ${p.title}`)
      );
      console.log();
    } catch {
      console.log("❌ posts 表不存在或無法讀取\n");
    }

    // 檢查 users 表的資料
    try {
      const users = await sql`SELECT id, name, email, role FROM users LIMIT 10`;
      console.log(`👤 Users 表 (共 ${users.length} 筆)：`);
      users.forEach((u: { id: number; name: string; email: string; role: string }) =>
        console.log(`  - [${u.id}] ${u.name} (${u.email}) - ${u.role}`)
      );
      console.log();
    } catch {
      console.log("❌ users 表不存在或無法讀取\n");
    }

    // 檢查 categories 表
    try {
      const categories = await sql`SELECT id, name, slug FROM categories`;
      console.log(`📂 Categories 表 (共 ${categories.length} 筆)：`);
      categories.forEach((c: { id: number; name: string; slug: string }) =>
        console.log(`  - [${c.id}] ${c.name} (${c.slug})`)
      );
      console.log();
    } catch {
      console.log("❌ categories 表不存在或無法讀取\n");
    }

    // 檢查 tags 表
    try {
      const tags = await sql`SELECT id, name, slug FROM tags`;
      console.log(`🏷️  Tags 表 (共 ${tags.length} 筆)：`);
      tags.forEach((t: { id: number; name: string; slug: string }) =>
        console.log(`  - [${t.id}] ${t.name} (${t.slug})`)
      );
      console.log();
    } catch {
      console.log("❌ tags 表不存在或無法讀取\n");
    }

  } catch (error) {
    console.error("❌ 檢查失敗:", error);
  }
}

checkDatabase();
