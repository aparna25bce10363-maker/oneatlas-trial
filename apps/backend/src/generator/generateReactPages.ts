export function generateReactPages(
  pages: any[]
) {

  let output = ``

  for (const page of pages) {

    output += `

PAGE:
${page.name}

ROUTE:
${page.route}

LAYOUT:
${page.layout}

----------------------

`
  }

  return output

}