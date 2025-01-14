<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/date';

  export let data: PageData;
</script>

<div class="container mx-auto py-8">
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">{data.article.title}</h1>
      <div class="flex gap-4">
        <a
          href="/articles/{data.article.slug}/edit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Article
        </a>
        <a
          href="/articles"
          class="text-gray-600 hover:text-gray-900 px-4 py-2"
        >
          Back to Articles
        </a>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>By {data.article.author.email}</span>
          <span>•</span>
          <span>Updated {formatDate(data.article.updatedAt)}</span>
          <span>•</span>
          <span class="px-2 py-1 rounded-full
            {data.article.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
             data.article.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
             'bg-red-100 text-red-800'}"
          >
            {data.article.status}
          </span>
        </div>

        {#if data.article.tags.length > 0}
          <div class="flex gap-2 mb-6">
            {#each data.article.tags as tag}
              <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                {tag.name}
              </span>
            {/each}
          </div>
        {/if}

        <div class="prose max-w-none">
          {@html data.article.content}
        </div>
      </div>
    </div>
  </div>
</div>