import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    /* ... */
  },
  shortcuts: {
    'card-area': 'bg-white p-4 shadow rounded-md mb-4',
    'card-title': 'text-lg font-bold mb-4',
  },
  corePlugins: {
    preflight: false,
  },
});
