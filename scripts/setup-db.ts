import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  console.log("🚀 開始設定資料庫...\n");

  try {
    // 刪除舊表格（如果存在）並重建
    console.log("🗑️  清除舊表格...");

    // 先刪除有外鍵依賴的表格
    await sql`DROP TABLE IF EXISTS post_tags CASCADE`;
    await sql`DROP TABLE IF EXISTS posts CASCADE`;
    await sql`DROP TABLE IF EXISTS categories CASCADE`;
    await sql`DROP TABLE IF EXISTS tags CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    await sql`DROP TABLE IF EXISTS article_access_whitelist CASCADE`;
    await sql`DROP TABLE IF EXISTS promotions CASCADE`;

    // 刪除 enums
    await sql`DROP TYPE IF EXISTS role CASCADE`;
    await sql`DROP TYPE IF EXISTS post_status CASCADE`;

    console.log("✅ 舊表格已清除\n");

    // 建立 Enums
    console.log("📦 建立 Enums...");
    await sql`CREATE TYPE role AS ENUM ('user', 'admin')`;
    await sql`CREATE TYPE post_status AS ENUM ('draft', 'published')`;
    console.log("✅ Enums 建立完成\n");

    // 建立 Users 表
    console.log("📦 建立 users 表...");
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        clerk_id VARCHAR(64) NOT NULL UNIQUE,
        name TEXT,
        email VARCHAR(320),
        image_url TEXT,
        role role NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ users 表建立完成\n");

    // 建立 Categories 表
    console.log("📦 建立 categories 表...");
    await sql`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ categories 表建立完成\n");

    // 建立 Tags 表
    console.log("📦 建立 tags 表...");
    await sql`
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        slug VARCHAR(50) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ tags 表建立完成\n");

    // 建立 Posts 表
    console.log("📦 建立 posts 表...");
    await sql`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        cover_image VARCHAR(500),
        category_id INTEGER REFERENCES categories(id),
        author_id INTEGER NOT NULL REFERENCES users(id),
        status post_status NOT NULL DEFAULT 'draft',
        published_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        view_count INTEGER NOT NULL DEFAULT 0,
        is_paid BOOLEAN NOT NULL DEFAULT FALSE,
        price INTEGER NOT NULL DEFAULT 0
      )
    `;
    console.log("✅ posts 表建立完成\n");

    // 建立 PostTags 表
    console.log("📦 建立 post_tags 表...");
    await sql`
      CREATE TABLE post_tags (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ post_tags 表建立完成\n");

    // 建立 ArticleAccessWhitelist 表
    console.log("📦 建立 article_access_whitelist 表...");
    await sql`
      CREATE TABLE article_access_whitelist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        article_slug VARCHAR(200) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ article_access_whitelist 表建立完成\n");

    // 建立 Promotions 表
    console.log("📦 建立 promotions 表...");
    await sql`
      CREATE TABLE promotions (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        image_url TEXT,
        link_url TEXT,
        link_text VARCHAR(100),
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("✅ promotions 表建立完成\n");

    console.log("🎉 資料庫設定完成！");

  } catch (error) {
    console.error("❌ 設定失敗:", error);
    throw error;
  }
}

setupDatabase();
