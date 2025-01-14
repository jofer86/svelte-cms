<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';

  export let data: PageData;

  let content = '';
  let tags = '';
</script>

<div class="container mx-auto py-8">
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">New Article</h1>
    </div>

    <form
      method="POST"
      class="bg-white shadow-md rounded-lg p-6"
      use:enhance
    >
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-6">
        <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">
          Slug (optional)
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          pattern="^[a-z0-9-]+$"
          title="Only lowercase letters, numbers, and hyphens are allowed"
        />
        <p class="mt-1 text-sm text-gray-500">
          Leave empty to generate from title
        </p>
      </div>

      <div class="mb-6">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <RichTextEditor
          bind:value={content}
          name="content"
        />
        <input type="hidden" name="content" value={content} />
      </div>

      <div class="mb-6">
        <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          bind:value={tags}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. svelte, javascript, tutorial"
        />
      </div>

      <div class="mb-6">
        <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div class="flex justify-end gap-4">
        <a
          href="/articles"
          class="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Article
        </button>
      </div>
    </form>
  </div>
</div>