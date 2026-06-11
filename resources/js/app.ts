import { createInertiaApp } from "@inertiajs/vue3"
import { createApp, DefineComponent, h } from "vue"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"

import "../css/app.css"
import layout from "./layouts/default.vue"

const viteAppName = import.meta.env.VITE_APP_NAME || "Laravel"

createInertiaApp({
  title: title => (title ? `${title} - ${viteAppName}` : viteAppName),
  layout: () => layout,
  resolve: name =>
    resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>("./pages/**/*.vue")
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  }
})
