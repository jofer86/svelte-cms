<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/date';

  export let data: PageData;
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-4xl font-bold text-gray-900 mb-8">Latest Articles</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.articles as article}
      <article class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
        <a href="/{article.slug}" class="block">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h2>
            <div class="text-sm text-gray-500 mb-4">
              <span>By {article.author.email}</span>
              <span class="mx-2">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {#if article.tags.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each article.tags as tag}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tag.name}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        </a>
      </article>
    {/each}
  </div>
</div>