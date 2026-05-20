"use client";

import { useState } from "react";
import Link from "next/link";
import { ResultTabs } from "@/components/ResultTabs";
import type { SchemaOutput } from "@/lib/schema";

type ExampleKey = "ecommerce" | "saas" | "blog";

interface Example {
  key: ExampleKey;
  name: string;
  description: string;
  prompt: string;
  data: SchemaOutput;
}

const EXAMPLES: Record<ExampleKey, Example> = {
  ecommerce: {
    key: "ecommerce",
    name: "E-Commerce System",
    description: "Multi-table shopping platform tracking customers, catalogs, categories, cart transactions, and order items.",
    prompt: "An E-commerce store tracking user profiles, product catalogs, hierarchical categories, shopping carts, and completed orders with line item quantities and pricing history.",
    data: {
      title: "E-Commerce DB Schema",
      summary: "Comprehensive database design containing customer profiles, structured catalogs, order details, and item breakdowns.",
      tables: [
        {
          name: "users",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "email", type: "varchar(255)", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "name", type: "text", nullable: true, primaryKey: false, unique: false, references: null },
            { name: "created_at", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "categories",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "name", type: "varchar(100)", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "parent_id", type: "uuid", nullable: true, primaryKey: false, unique: false, references: "categories" }
          ]
        },
        {
          name: "products",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "category_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "categories" },
            { name: "name", type: "varchar(255)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "price", type: "numeric(10,2)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "created_at", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "orders",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "user_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "users" },
            { name: "status", type: "varchar(50)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "total_amount", type: "numeric(12,2)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "created_at", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "order_items",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "order_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "orders" },
            { name: "product_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "products" },
            { name: "quantity", type: "integer", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "price", type: "numeric(10,2)", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        }
      ],
      prisma: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String   @unique @db.VarChar(255)
  name      String?
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  orders    Order[]

  @@map("users")
}

model Category {
  id        String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String     @unique @db.VarChar(100)
  parentId  String?    @map("parent_id") @db.Uuid
  parent    Category?  @relation("CategoryToCategory", fields: [parentId], references: [id])
  children  Category[] @relation("CategoryToCategory")
  products  Product[]

  @@map("categories")
}

model Product {
  id         String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  categoryId String      @map("category_id") @db.Uuid
  name       String      @db.VarChar(255)
  price      Decimal     @db.Decimal(10, 2)
  createdAt  DateTime    @default(now()) @map("created_at") @db.Timestamptz(6)
  category   Category    @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  orderItems OrderItem[]

  @@map("products")
}

model Order {
  id          String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String      @map("user_id") @db.Uuid
  status      String      @db.VarChar(50)
  totalAmount Decimal     @map("total_amount") @db.Decimal(12, 2)
  createdAt   DateTime    @default(now()) @map("created_at") @db.Timestamptz(6)
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderItems  OrderItem[]

  @@map("orders")
}

model OrderItem {
  id        String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orderId   String  @map("order_id") @db.Uuid
  productId String  @map("product_id") @db.Uuid
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@map("order_items")
}`,
      sql: `-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  total_amount NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);`,
      mermaid: `erDiagram
  users {
    uuid id PK
    varchar_255_ email UK
    text name
    timestamptz created_at
  }
  categories {
    uuid id PK
    varchar_100_ name UK
    uuid parent_id FK
  }
  products {
    uuid id PK
    uuid category_id FK
    varchar_255_ name
    numeric_10_2_ price
    timestamptz created_at
  }
  orders {
    uuid id PK
    uuid user_id FK
    varchar_50_ status
    numeric_12_2_ total_amount
    timestamptz created_at
  }
  order_items {
    uuid id PK
    uuid order_id FK
    uuid product_id FK
    integer quantity
    numeric_10_2_ price
  }
  categories ||--o{ categories : "subcategories"
  categories ||--o{ products : "contains"
  users ||--o{ orders : "places"
  orders ||--|{ order_items : "contains"
  products ||--o{ order_items : "purchased_in"`
    }
  },
  saas: {
    key: "saas",
    name: "SaaS Task Management",
    description: "Collaboration backend modeled around Organizations, Workspaces, Project Boards, Tasks, and Memberships.",
    prompt: "SaaS task board engine. Handles Organizations, user Workspace environments, Projects, Kanban Boards with columns, Task cards, multi-assignees, and comment logs.",
    data: {
      title: "SaaS Board Schema",
      summary: "Relational collaboration schema supporting organizational membership, board column pipelines, and card logging.",
      tables: [
        {
          name: "organizations",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "name", type: "varchar(100)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "slug", type: "varchar(100)", nullable: false, primaryKey: false, unique: true, references: null }
          ]
        },
        {
          name: "memberships",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "org_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "organizations" },
            { name: "user_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "users" },
            { name: "role", type: "varchar(30)", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "boards",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "org_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "organizations" },
            { name: "title", type: "varchar(100)", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "columns",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "board_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "boards" },
            { name: "name", type: "varchar(50)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "position", type: "integer", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "cards",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "column_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "columns" },
            { name: "title", type: "varchar(255)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "description", type: "text", nullable: true, primaryKey: false, unique: false, references: null }
          ]
        }
      ],
      prisma: `model Organization {
  id          String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String       @db.VarChar(100)
  slug        String       @unique @db.VarChar(100)
  memberships Membership[]
  boards      Board[]

  @@map("organizations")
}

model Membership {
  id     String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orgId  String @map("org_id") @db.Uuid
  userId String @map("user_id") @db.Uuid
  role   String @db.VarChar(30)
  org    Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)

  @@unique([orgId, userId])
  @@map("memberships")
}

model Board {
  id      String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  orgId   String   @map("org_id") @db.Uuid
  title   String   @db.VarChar(100)
  org     Organization @relation(fields: [orgId], references: [id], onDelete: Cascade)
  columns Column[]

  @@map("boards")
}

model Column {
  id       String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  boardId  String @map("board_id") @db.Uuid
  name     String @db.VarChar(50)
  position Int
  board    Board  @relation(fields: [boardId], references: [id], onDelete: Cascade)
  cards    Card[]

  @@map("columns")
}

model Card {
  id          String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  columnId    String  @map("column_id") @db.Uuid
  title       String  @db.VarChar(255)
  description String?
  column      Column  @relation(fields: [columnId], references: [id], onDelete: Cascade)

  @@map("cards")
}`,
      sql: `-- Create organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- Create memberships
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role VARCHAR(30) NOT NULL,
  CONSTRAINT uq_org_user UNIQUE (org_id, user_id)
);

-- Create boards
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL
);

-- Create columns
CREATE TABLE columns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  position INTEGER NOT NULL
);

-- Create cards
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  column_id UUID NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT
);`,
      mermaid: `erDiagram
  organizations {
    uuid id PK
    varchar_100_ name
    varchar_100_ slug UK
  }
  memberships {
    uuid id PK
    uuid org_id FK
    uuid user_id
    varchar_30_ role
  }
  boards {
    uuid id PK
    uuid org_id FK
    varchar_100_ title
  }
  columns {
    uuid id PK
    uuid board_id FK
    varchar_50_ name
    integer position
  }
  cards {
    uuid id PK
    uuid column_id FK
    varchar_255_ title
    text description
  }
  organizations ||--o{ memberships : "houses"
  organizations ||--o{ boards : "owns"
  boards ||--|{ columns : "contains"
  columns ||--o{ cards : "contains"`
    }
  },
  blog: {
    key: "blog",
    name: "Developer Blog System",
    description: "Clean publishing model linking Authors, Posts, Category Tags, and nested Comment responses.",
    prompt: "Developer blog. Supports author profiles, blog post articles, tag categorizations with a clean junction mapping, and comment response trees.",
    data: {
      title: "Blog Platform Schema",
      summary: "Modern developer publishing schema featuring recursive commenting structures and direct tagging relations.",
      tables: [
        {
          name: "authors",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "username", type: "varchar(50)", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "bio", type: "text", nullable: true, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "posts",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "author_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "authors" },
            { name: "title", type: "varchar(255)", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "body", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "published_at", type: "timestamptz", nullable: true, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "tags",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "name", type: "varchar(50)", nullable: false, primaryKey: false, unique: true, references: null }
          ]
        },
        {
          name: "posts_tags",
          columns: [
            { name: "post_id", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "posts" },
            { name: "tag_id", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "tags" }
          ]
        },
        {
          name: "comments",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "post_id", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "posts" },
            { name: "parent_id", type: "uuid", nullable: true, primaryKey: false, unique: false, references: "comments" },
            { name: "content", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "created_at", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        }
      ],
      prisma: `model Author {
  id       String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  username String  @unique @db.VarChar(50)
  bio      String?
  posts    Post[]

  @@map("authors")
}

model Post {
  id          String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  authorId    String     @map("author_id") @db.Uuid
  title       String     @db.VarChar(255)
  body        String
  publishedAt DateTime?  @map("published_at") @db.Timestamptz(6)
  author      Author     @relation(fields: [authorId], references: [id], onDelete: Restrict)
  comments    Comment[]
  tags        PostTag[]

  @@map("posts")
}

model Tag {
  id    String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name  String    @unique @db.VarChar(50)
  posts PostTag[]

  @@map("tags")
}

model PostTag {
  postId String @map("post_id") @db.Uuid
  tagId  String @map("tag_id") @db.Uuid
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag    Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
  @@map("posts_tags")
}

model Comment {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  postId    String    @map("post_id") @db.Uuid
  parentId  String?   @map("parent_id") @db.Uuid
  content   String
  createdAt DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent    Comment?  @relation("CommentToComment", fields: [parentId], references: [id], onDelete: Cascade)
  replies   Comment[] @relation("CommentToComment")

  @@map("comments")
}`,
      sql: `-- Create authors
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) NOT NULL UNIQUE,
  bio TEXT
);

-- Create posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES authors(id),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  published_at TIMESTAMPTZ
);

-- Create tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Create posts_tags junction
CREATE TABLE posts_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
      mermaid: `erDiagram
  authors {
    uuid id PK
    varchar_50_ username UK
    text bio
  }
  posts {
    uuid id PK
    uuid author_id FK
    varchar_255_ title
    text body
    timestamptz published_at
  }
  tags {
    uuid id PK
    varchar_50_ name UK
  }
  posts_tags {
    uuid post_id PK,FK
    uuid tag_id PK,FK
  }
  comments {
    uuid id PK
    uuid post_id FK
    uuid parent_id FK
    text content
    timestamptz created_at
  }
  authors ||--o{ posts : "writes"
  posts ||--|{ posts_tags : "tagged"
  tags ||--|{ posts_tags : "tags"
  posts ||--o{ comments : "has"
  comments ||--o{ comments : "replies"`
    }
  }
};

export default function ExamplesPage() {
  const [selected, setSelected] = useState<ExampleKey>("ecommerce");
  const example = EXAMPLES[selected];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100 flex flex-col justify-between">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
            <span className="size-1.5 rounded-full bg-indigo-400" /> Interactive Gallery
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Database Schema Gallery</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
            Explore live examples of database ER diagrams, Postgres SQL tables, and Prisma ORM schemas. Switch between examples below to see high-quality outputs before generating yours.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-zinc-900/40 w-fit border border-zinc-800/60">
          {(Object.values(EXAMPLES)).map((ex) => (
            <button
              key={ex.key}
              onClick={() => setSelected(ex.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                selected === ex.key
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>

        {/* Example Workbench Layout */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-6 lg:h-[calc(100vh-280px)] lg:min-h-[520px]">
          
          {/* Left Context Panel */}
          <div className="rounded-2xl border border-zinc-800 bg-[var(--panel)] p-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400">Database Context</span>
                <h3 className="text-lg font-semibold text-zinc-100">{example.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{example.description}</p>
              </div>

              {/* Prompt box */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Natural Language Prompt</span>
                <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3 text-xs text-zinc-300 leading-relaxed font-sans italic">
                  &quot;{example.prompt}&quot;
                </div>
              </div>

              {/* Input mode indication */}
              <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-3.5 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Input Source</span>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                  </svg>
                  <span>Hand-drawn whiteboard ER sketch</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/generate"
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-md shadow-indigo-500/10"
              >
                Start Generating Schema
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.97H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
              <div className="text-[10px] text-zinc-500 text-center">
                *Requires your own Gemini API Key configured.
              </div>
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="min-h-[480px] lg:min-h-0">
            <ResultTabs data={example.data} modelUsed="gemini-3.1-pro-preview" />
          </div>

        </div>

      </main>
    </div>
  );
}
