import { PrismaClient, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test users
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      hashedPassword: await bcrypt.hash('password123', 10),
      role: 'USER'
    }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      hashedPassword: await bcrypt.hash('admin123', 10),
      role: 'ADMIN'
    }
  });

  // Create some test articles
  const articles = [
    {
      title: 'Getting Started with SvelteKit',
      content: `
        <h2>Introduction</h2>
        <p>SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.</p>
        <h2>Why SvelteKit?</h2>
        <p>SvelteKit is the fastest way to build Svelte apps. It includes everything you need:</p>
        <ul>
          <li>Routing</li>
          <li>Server-side rendering</li>
          <li>Data fetching</li>
          <li>Service workers</li>
        </ul>
      `,
      status: Status.PUBLISHED,
      authorId: testUser.id,
      tags: {
        create: [
          { name: 'svelte' },
          { name: 'javascript' },
          { name: 'web-development' }
        ]
      }
    },
    {
      title: 'Building a CMS with SvelteKit',
      content: `
        <h2>Project Setup</h2>
        <p>In this tutorial, we'll build a full-featured CMS using SvelteKit and Prisma.</p>
        <h2>Features</h2>
        <ul>
          <li>User authentication</li>
          <li>Article management</li>
          <li>Rich text editing</li>
          <li>Tag system</li>
        </ul>
      `,
      status: Status.DRAFT,
      authorId: adminUser.id,
      tags: {
        create: [
          { name: 'cms' },
          { name: 'tutorial' }
        ]
      }
    }
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        slug: article.title.toLowerCase().replace(/\s+/g, '-'),
        publishedAt: article.status === Status.PUBLISHED ? new Date() : null
      }
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });