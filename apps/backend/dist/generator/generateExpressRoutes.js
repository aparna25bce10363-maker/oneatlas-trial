"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpressRoutes = generateExpressRoutes;
function generateExpressRoutes(entities) {
    let routes = ``;
    for (const entity of entities) {
        const route = entity.tableName;
        routes += `

/**
 * ${entity.name}
 */

app.get(
  "/api/${route}",
  (req, res) => {

    res.json({
      message:
        "Get all ${route}"
    })

  }
)

app.get(
  "/api/${route}/:id",
  (req, res) => {

    res.json({
      id: req.params.id,
      message:
        "Get ${entity.name}"
    })

  }
)

app.post(
  "/api/${route}",
  (req, res) => {

    res.json({
      message:
        "Create ${entity.name}"
    })

  }
)

app.put(
  "/api/${route}/:id",
  (req, res) => {

    res.json({
      id: req.params.id,
      message:
        "Update ${entity.name}"
    })

  }
)

app.delete(
  "/api/${route}/:id",
  (req, res) => {

    res.json({
      id: req.params.id,
      message:
        "Delete ${entity.name}"
    })

  }
)

`;
    }
    return routes;
}
