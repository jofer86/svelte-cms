import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  const articles = await prisma.article.findMany({
    where: {
      authorId: locals.user.userId
    },
    include: {
      author: {
        select: {
          email: true
        }
      },
      tags: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return {
    articles
  };
}) satisfies PageServerLoad;

export const actions = {
  deleteArticle: async ({ request, locals }) => {
    if (!locals.user) {
      throw error(401, 'Not authenticated');
    }

    const data = await request.formData();
    const id = data.get('id') as string;

    if (!id) {
      throw error(400, 'Article ID is required');
    }

    const article = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true }
    });

    if (!article) {
      throw error(404, 'Article not found');
    }

    if (article.authorId !== locals.user.userId) {
      throw error(403, 'Not authorized to delete this article');
    }

    await prisma.article.delete({
      where: { id }
    });

    return {
      success: true
    };
  }
} satisfies Actions;