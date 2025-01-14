import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import slugify from '$lib/utils/slugify';

export const load = (async ({ params, locals }) => {
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  // For new articles, return empty data
  if (params.slug === 'new') {
    return {
      article: null
    };
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      tags: true
    }
  });

  if (!article) {
    throw error(404, 'Article not found');
  }

  if (article.authorId !== locals.user.userId) {
    throw error(403, 'Not authorized to edit this article');
  }

  return {
    article
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw error(401, 'Not authenticated');
    }

    const data = await request.formData();
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    const status = data.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    const tags = (data.get('tags') as string || '').split(',')
      .map(t => t.trim())
      .filter(Boolean);

    let slug = data.get('slug') as string;
    if (!slug) {
      slug = slugify(title);
    }

    // Validate required fields
    if (!title || !content || !status) {
      throw error(400, 'Missing required fields');
    }

    // Create or connect tags
    const tagConnections = await Promise.all(
      tags.map(async (name) => {
        const tag = await prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {}
        });
        return { id: tag.id };
      })
    );

    // Check if we're updating an existing article
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, authorId: true }
    });

    if (existingArticle) {
      // Update existing article
      if (existingArticle.authorId !== locals.user.userId) {
        throw error(403, 'Not authorized to edit this article');
      }

      const article = await prisma.article.update({
        where: { id: existingArticle.id },
        data: {
          title,
          content,
          slug,
          status,
          tags: {
            set: tagConnections
          },
          publishedAt: status === 'PUBLISHED' ? new Date() : null
        }
      });

      return { article };
    } else {
      // Create new article
      const article = await prisma.article.create({
        data: {
          title,
          content,
          slug,
          status,
          authorId: locals.user.userId,
          tags: {
            connect: tagConnections
          },
          publishedAt: status === 'PUBLISHED' ? new Date() : null
        }
      });

      return { article };
    }
  }
} satisfies Actions;