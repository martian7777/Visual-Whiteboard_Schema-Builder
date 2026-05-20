import type { SchemaOutput } from "./schema";

export type Example = {
  id: string;
  label: string;
  description: string;
  data: SchemaOutput;
};

export const EXAMPLES: Example[] = [
  {
    id: "blog",
    label: "Blog Platform",
    description: "Users write posts, readers leave comments, posts are tagged.",
    data: {
      title: "Blog Platform",
      summary: "Authors publish posts with tags; readers comment.",
      tables: [
        {
          name: "User",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "email", type: "text", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "name", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Post",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "authorId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "User.id" },
            { name: "title", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "body", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "publishedAt", type: "timestamptz", nullable: true, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Comment",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "postId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "Post.id" },
            { name: "authorId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "User.id" },
            { name: "body", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Tag",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "name", type: "text", nullable: false, primaryKey: false, unique: true, references: null }
          ]
        },
        {
          name: "PostTag",
          columns: [
            { name: "postId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Post.id" },
            { name: "tagId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Tag.id" }
          ]
        }
      ],
      prisma: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  posts     Post[]
  comments  Comment[]
}

model Post {
  id          String    @id @default(uuid())
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  title       String
  body        String
  publishedAt DateTime?
  comments    Comment[]
  tags        PostTag[]
}

model Comment {
  id        String   @id @default(uuid())
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  body      String
  createdAt DateTime @default(now())
}

model Tag {
  id    String    @id @default(uuid())
  name  String    @unique
  posts PostTag[]
}

model PostTag {
  postId String
  tagId  String
  post   Post @relation(fields: [postId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([postId, tagId])
}`,
      sql: `CREATE TABLE "User" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email        text NOT NULL UNIQUE,
  name         text NOT NULL,
  "createdAt"  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "Post" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "authorId"   uuid NOT NULL REFERENCES "User"(id),
  title        text NOT NULL,
  body         text NOT NULL,
  "publishedAt" timestamptz
);

CREATE TABLE "Comment" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "postId"     uuid NOT NULL REFERENCES "Post"(id),
  "authorId"   uuid NOT NULL REFERENCES "User"(id),
  body         text NOT NULL,
  "createdAt"  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "Tag" (
  id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name  text NOT NULL UNIQUE
);

CREATE TABLE "PostTag" (
  "postId" uuid NOT NULL REFERENCES "Post"(id),
  "tagId"  uuid NOT NULL REFERENCES "Tag"(id),
  PRIMARY KEY ("postId", "tagId")
);`,
      mermaid: `erDiagram
  User ||--o{ Post : "authors"
  User ||--o{ Comment : "writes"
  Post ||--o{ Comment : "has"
  Post ||--o{ PostTag : "tagged"
  Tag  ||--o{ PostTag : "labels"
  User {
    uuid id PK
    text email UK
    text name
    timestamptz createdAt
  }
  Post {
    uuid id PK
    uuid authorId FK
    text title
    text body
    timestamptz publishedAt
  }
  Comment {
    uuid id PK
    uuid postId FK
    uuid authorId FK
    text body
    timestamptz createdAt
  }
  Tag {
    uuid id PK
    text name UK
  }
  PostTag {
    uuid postId PK,FK
    uuid tagId PK,FK
  }`
    }
  },
  {
    id: "ecommerce",
    label: "E-commerce Store",
    description: "Products, carts, orders, and customers in a small shop.",
    data: {
      title: "E-commerce Store",
      summary: "Customers add products to a cart and place orders.",
      tables: [
        {
          name: "Customer",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "email", type: "text", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "fullName", type: "text", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Product",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "sku", type: "text", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "name", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "priceCents", type: "integer", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "stock", type: "integer", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Cart",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "customerId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "Customer.id" },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "CartItem",
          columns: [
            { name: "cartId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Cart.id" },
            { name: "productId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Product.id" },
            { name: "quantity", type: "integer", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Order",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "customerId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "Customer.id" },
            { name: "totalCents", type: "integer", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "status", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "placedAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "OrderItem",
          columns: [
            { name: "orderId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Order.id" },
            { name: "productId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Product.id" },
            { name: "quantity", type: "integer", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "unitPriceCents", type: "integer", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        }
      ],
      prisma: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Customer {
  id       String  @id @default(uuid())
  email    String  @unique
  fullName String
  carts    Cart[]
  orders   Order[]
}

model Product {
  id         String      @id @default(uuid())
  sku        String      @unique
  name       String
  priceCents Int
  stock      Int
  cartItems  CartItem[]
  orderItems OrderItem[]
}

model Cart {
  id         String     @id @default(uuid())
  customerId String
  customer   Customer   @relation(fields: [customerId], references: [id])
  createdAt  DateTime   @default(now())
  items      CartItem[]
}

model CartItem {
  cartId    String
  productId String
  quantity  Int
  cart      Cart    @relation(fields: [cartId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@id([cartId, productId])
}

model Order {
  id         String      @id @default(uuid())
  customerId String
  customer   Customer    @relation(fields: [customerId], references: [id])
  totalCents Int
  status     String
  placedAt   DateTime    @default(now())
  items      OrderItem[]
}

model OrderItem {
  orderId        String
  productId      String
  quantity       Int
  unitPriceCents Int
  order          Order   @relation(fields: [orderId], references: [id])
  product        Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
}`,
      sql: `CREATE TABLE "Customer" (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email     text NOT NULL UNIQUE,
  "fullName" text NOT NULL
);

CREATE TABLE "Product" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku          text NOT NULL UNIQUE,
  name         text NOT NULL,
  "priceCents" integer NOT NULL,
  stock        integer NOT NULL
);

CREATE TABLE "Cart" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "customerId" uuid NOT NULL REFERENCES "Customer"(id),
  "createdAt"  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "CartItem" (
  "cartId"    uuid NOT NULL REFERENCES "Cart"(id),
  "productId" uuid NOT NULL REFERENCES "Product"(id),
  quantity    integer NOT NULL,
  PRIMARY KEY ("cartId", "productId")
);

CREATE TABLE "Order" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "customerId" uuid NOT NULL REFERENCES "Customer"(id),
  "totalCents" integer NOT NULL,
  status       text NOT NULL,
  "placedAt"   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "OrderItem" (
  "orderId"        uuid NOT NULL REFERENCES "Order"(id),
  "productId"      uuid NOT NULL REFERENCES "Product"(id),
  quantity         integer NOT NULL,
  "unitPriceCents" integer NOT NULL,
  PRIMARY KEY ("orderId", "productId")
);`,
      mermaid: `erDiagram
  Customer ||--o{ Cart : "owns"
  Customer ||--o{ Order : "places"
  Cart     ||--o{ CartItem : "contains"
  Product  ||--o{ CartItem : "in"
  Order    ||--o{ OrderItem : "contains"
  Product  ||--o{ OrderItem : "in"
  Customer {
    uuid id PK
    text email UK
    text fullName
  }
  Product {
    uuid id PK
    text sku UK
    text name
    integer priceCents
    integer stock
  }
  Cart {
    uuid id PK
    uuid customerId FK
    timestamptz createdAt
  }
  CartItem {
    uuid cartId PK,FK
    uuid productId PK,FK
    integer quantity
  }
  Order {
    uuid id PK
    uuid customerId FK
    integer totalCents
    text status
    timestamptz placedAt
  }
  OrderItem {
    uuid orderId PK,FK
    uuid productId PK,FK
    integer quantity
    integer unitPriceCents
  }`
    }
  },
  {
    id: "twitter",
    label: "Twitter Clone",
    description: "Users post tweets, follow each other, like and reply.",
    data: {
      title: "Twitter Clone",
      summary: "Microblog with follows, tweets, likes, and threaded replies.",
      tables: [
        {
          name: "User",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "handle", type: "text", nullable: false, primaryKey: false, unique: true, references: null },
            { name: "displayName", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "bio", type: "text", nullable: true, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Tweet",
          columns: [
            { name: "id", type: "uuid", nullable: false, primaryKey: true, unique: true, references: null },
            { name: "authorId", type: "uuid", nullable: false, primaryKey: false, unique: false, references: "User.id" },
            { name: "body", type: "text", nullable: false, primaryKey: false, unique: false, references: null },
            { name: "parentTweetId", type: "uuid", nullable: true, primaryKey: false, unique: false, references: "Tweet.id" },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Like",
          columns: [
            { name: "userId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "User.id" },
            { name: "tweetId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "Tweet.id" },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        },
        {
          name: "Follow",
          columns: [
            { name: "followerId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "User.id" },
            { name: "followeeId", type: "uuid", nullable: false, primaryKey: true, unique: false, references: "User.id" },
            { name: "createdAt", type: "timestamptz", nullable: false, primaryKey: false, unique: false, references: null }
          ]
        }
      ],
      prisma: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(uuid())
  handle      String   @unique
  displayName String
  bio         String?
  tweets      Tweet[]
  likes       Like[]
  following   Follow[] @relation("Follower")
  followers   Follow[] @relation("Followee")
}

model Tweet {
  id            String   @id @default(uuid())
  authorId      String
  author        User     @relation(fields: [authorId], references: [id])
  body          String
  parentTweetId String?
  parent        Tweet?   @relation("Replies", fields: [parentTweetId], references: [id])
  replies       Tweet[]  @relation("Replies")
  likes         Like[]
  createdAt     DateTime @default(now())
}

model Like {
  userId    String
  tweetId   String
  user      User     @relation(fields: [userId], references: [id])
  tweet     Tweet    @relation(fields: [tweetId], references: [id])
  createdAt DateTime @default(now())

  @@id([userId, tweetId])
}

model Follow {
  followerId String
  followeeId String
  follower   User     @relation("Follower", fields: [followerId], references: [id])
  followee   User     @relation("Followee", fields: [followeeId], references: [id])
  createdAt  DateTime @default(now())

  @@id([followerId, followeeId])
}`,
      sql: `CREATE TABLE "User" (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle        text NOT NULL UNIQUE,
  "displayName" text NOT NULL,
  bio           text
);

CREATE TABLE "Tweet" (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "authorId"      uuid NOT NULL REFERENCES "User"(id),
  body            text NOT NULL,
  "parentTweetId" uuid REFERENCES "Tweet"(id),
  "createdAt"     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "Like" (
  "userId"   uuid NOT NULL REFERENCES "User"(id),
  "tweetId"  uuid NOT NULL REFERENCES "Tweet"(id),
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("userId", "tweetId")
);

CREATE TABLE "Follow" (
  "followerId" uuid NOT NULL REFERENCES "User"(id),
  "followeeId" uuid NOT NULL REFERENCES "User"(id),
  "createdAt"  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("followerId", "followeeId")
);`,
      mermaid: `erDiagram
  User  ||--o{ Tweet  : "authors"
  User  ||--o{ Like   : "gives"
  Tweet ||--o{ Like   : "receives"
  Tweet ||--o{ Tweet  : "replies"
  User  ||--o{ Follow : "follower"
  User  ||--o{ Follow : "followee"
  User {
    uuid id PK
    text handle UK
    text displayName
    text bio
  }
  Tweet {
    uuid id PK
    uuid authorId FK
    text body
    uuid parentTweetId FK
    timestamptz createdAt
  }
  Like {
    uuid userId PK,FK
    uuid tweetId PK,FK
    timestamptz createdAt
  }
  Follow {
    uuid followerId PK,FK
    uuid followeeId PK,FK
    timestamptz createdAt
  }`
    }
  }
];
