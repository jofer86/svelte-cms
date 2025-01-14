<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';

  export let value = '';
  export let name = 'content';

  let element: HTMLElement;
  let editor: Editor | undefined;

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-500 hover:text-blue-700 underline'
          }
        }),
        Image.configure({
          HTMLAttributes: {
            class: 'max-w-full h-auto'
          }
        })
      ],
      content: value,
      onUpdate: ({ editor }) => {
        value = editor.getHTML();
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="rich-text-editor border border-gray-300 rounded-md">
  <div class="menu border-b border-gray-300 p-2 flex gap-2">
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      class:bg-gray-200={editor?.isActive('bold')}
      on:click={() => editor?.chain().focus().toggleBold().run()}
    >
      B
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded italic"
      class:bg-gray-200={editor?.isActive('italic')}
      on:click={() => editor?.chain().focus().toggleItalic().run()}
    >
      I
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      class:bg-gray-200={editor?.isActive('heading', { level: 2 })}
      on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      H2
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      class:bg-gray-200={editor?.isActive('bulletList')}
      on:click={() => editor?.chain().focus().toggleBulletList().run()}
    >
      •
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      class:bg-gray-200={editor?.isActive('orderedList')}
      on:click={() => editor?.chain().focus().toggleOrderedList().run()}
    >
      1.
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      on:click={() => {
        const url = window.prompt('Enter the URL');
        if (url) {
          editor?.chain().focus().setLink({ href: url }).run();
        }
      }}
      class:bg-gray-200={editor?.isActive('link')}
    >
      🔗
    </button>
    <button
      type="button"
      class="p-2 hover:bg-gray-100 rounded"
      on:click={() => {
        const url = window.prompt('Enter the image URL');
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run();
        }
      }}
    >
      📷
    </button>
  </div>

  <div
    bind:this={element}
    class="prose max-w-none p-4 min-h-[200px] focus:outline-none"
  />
</div>

<style>
  :global(.ProseMirror) {
    outline: none;
  }

  :global(.ProseMirror p) {
    margin: 1em 0;
  }

  :global(.ProseMirror > *:first-child) {
    margin-top: 0;
  }
</style>