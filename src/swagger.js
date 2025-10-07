import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voyage dans les Musées Perdus - API",
      version: "1.0.0",
    //   description:
    //     "API du projet Workshop EPSI 2025 — Escape Game artistique et touristique.\n\n📘 Permet de gérer les sessions, la progression et les logs du jeu.",
    //   contact: {
    //     name: "Équipe EPSI Nantes",
    //     // email: "contact@epsi.fr",
    //   },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Serveur local",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Où Swagger va lire les commentaires JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📖 Swagger disponible sur http://localhost:4000/api-docs");
}
