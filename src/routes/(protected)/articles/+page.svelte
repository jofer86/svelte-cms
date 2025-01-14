<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { formatDate } from '$lib/utils/date';

  export let data: PageData;
</script>

<div class="container mx-auto py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold">Articles</h1>
    <a
      href="/articles/new"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      New Article
    </a>
  </div>

  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each data.articles as article}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <a
                href="/articles/{article.slug}"
                class="block hover:text-blue-600"
              >
                <div class="text-sm font-medium text-gray-900">{article.title}</div>
                <div class="text-sm text-gray-500">{article.slug}</div>
              </a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                {article.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                 article.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                 'bg-red-100 text-red-800'}">
                {article.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {article.author.email}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatDate(article.updatedAt)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a
                href="/articles/{article.slug}/edit"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </a>
              <form
                method="POST"
                action="?/deleteArticle"
                class="inline"
                use:enhance
              >
                <input type="hidden" name="id" value={article.id} />
                <button
                  type="submit"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>