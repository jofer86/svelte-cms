import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { Status } from '@prisma/client';

export const load: PageServerLoad = async () => {
  const articles = await prisma.article.findMany({
    where: {
      status: Status.PUBLISHED
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
      publishedAt: 'desc'
    }
  });

  return {
    articles
  };
};