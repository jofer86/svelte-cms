import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ params, locals }) => {
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: {
          email: true
        }
      },
      tags: true
    }
  });

  if (!article) {
    throw error(404, 'Article not found');
  }

  // Only allow viewing if published or if user is the author
  if (article.status !== 'PUBLISHED' && article.authorId !== locals.user.userId) {
    throw error(403, 'Not authorized to view this article');
  }

  return {
    article
  };
}) satisfies PageServerLoad;