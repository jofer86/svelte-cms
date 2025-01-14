<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/date';

  export let data: PageData;
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <article class="prose lg:prose-lg mx-auto">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{data.article.title}</h1>
      <div class="flex items-center text-gray-500 text-sm mb-4">
        <span>By {data.article.author.email}</span>
        <span class="mx-2">•</span>
        <span>{formatDate(data.article.publishedAt)}</span>
      </div>
      {#if data.article.tags.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each data.article.tags as tag}
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tag.name}
            </span>
          {/each}
        </div>
      {/if}
    </header>

    <div class="article-content">
      {@html data.article.content}
    </div>

    <footer class="mt-12 pt-8 border-t border-gray-200">
      <a href="/" class="text-blue-600 hover:text-blue-800">← Back to articles</a>
    </footer>
  </article>
</div>