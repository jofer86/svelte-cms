<script lang="ts">
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';

  export let data: LayoutData;

  const navigation = [
    { href: '/articles', label: 'Articles' }
  ];
</script>

<div class="min-h-screen bg-gray-100">
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <a href="/articles" class="text-xl font-bold text-gray-800">
              Svelte CMS
            </a>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            {#each navigation as item}
              <a
                href={item.href}
                class="
                  {$page.url.pathname.startsWith(item.href)
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                "
              >
                {item.label}
              </a>
            {/each}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">
            {data.user.email}
          </span>
          <a
            href="/logout"
            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main class="py-10">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>
</div>