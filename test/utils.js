import tailwindcss from 'tailwindcss'
import postcss from 'postcss'
import animationsPlugin from '../src/index.js'
import minify from '@csstools/postcss-minify'

const TAILWIND_BASE = '@tailwind utilities;'

export function generatePluginCSS (options) {
  const { inline = '', content = '' } = options

  return postcss([
    minify(),
    tailwindcss({
      plugins: [animationsPlugin],
      content: [{ raw: content }]
    })
  ])
    .process(`${TAILWIND_BASE} ${inline}`, {
      from: undefined
    })
    .then((result) => result.css)
}

console.log(
  await generatePluginCSS({
    content: '<div class="animate-zoom-in">Hello</div>'
  })
)
