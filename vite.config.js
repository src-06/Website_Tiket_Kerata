import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import { google } from 'laravel-vite-plugin/fonts'
import tailwindcss from '@tailwindcss/vite'
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
      fonts: [
        google('Montserrat', {
          weights: [400, 600, 700]
        })
      ]
    }),
    tailwindcss(),
    wayfinder(),
    vue()
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './resources/js')
    }
  },
  server: {
    watch: {
      ignored: ['**/storage/framework/views/**']
    }
  }
})
