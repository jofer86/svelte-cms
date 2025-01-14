<script lang="ts">
	import '../app.css';
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-gray-800">
							Svelte CMS
						</a>
					</div>
				</div>
				<div class="flex items-center">
					<a
						href="/articles"
						class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
					>
						Admin
					</a>
				</div>
			</div>
		</div>
	</nav>

	<slot />
</div>
