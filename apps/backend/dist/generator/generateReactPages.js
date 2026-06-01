"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReactPages = generateReactPages;
function generateReactPages(pages) {
    let output = ``;
    for (const page of pages) {
        output += `

PAGE:
${page.name}

ROUTE:
${page.route}

LAYOUT:
${page.layout}

----------------------

`;
    }
    return output;
}
