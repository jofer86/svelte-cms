import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { Status } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
  const article = await prisma.article.findFirst({
    where: {
      slug: params.slug,
      status: Status.PUBLISHED
    },
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

  return {
    article
  };
};