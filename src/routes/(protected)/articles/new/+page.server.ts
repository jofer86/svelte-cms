import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import slugify from '$lib/utils/slugify';

export const load = (async ({ locals }) => {
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  return {};
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

    let slug = (data.get('slug') as string || '').trim();
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

    // Create new article
    await prisma.article.create({
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

    throw redirect(303, '/articles');
  }
} satisfies Actions;