import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function checkSchema() {
  console.log("🔍 檢查表格 Schema...\n");

  try {
    // 檢查 users 表結構
    const usersColumns = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `;
    console.log("👤 users 表結構：");
    usersColumns.forEach((c: { column_name: string; data_type: string; is_nullable: string }) =>
      console.log(`  - ${c.column_name}: ${c.data_type} (${c.is_nullable === 'YES' ? 'nullable' : 'required'})`)
    );
    console.log();

    // 檢查 posts 表結構
    const postsColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'posts'
      ORDER BY ordinal_position
    `;
    console.log("📝 posts 表結構：");
    postsColumns.forEach((c: { column_name: string; data_type: string; is_nullable: string }) =>
      console.log(`  - ${c.column_name}: ${c.data_type} (${c.is_nullable === 'YES' ? 'nullable' : 'required'})`)
    );
    console.log();

    // 檢查 categories 表結構
    const categoriesColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'categories'
      ORDER BY ordinal_position
    `;
    console.log("📂 categories 表結構：");
    categoriesColumns.forEach((c: { column_name: string; data_type: string; is_nullable: string }) =>
      console.log(`  - ${c.column_name}: ${c.data_type} (${c.is_nullable === 'YES' ? 'nullable' : 'required'})`)
    );
    console.log();

  } catch (error) {
    console.error("❌ 檢查失敗:", error);
  }
}

checkSchema();
