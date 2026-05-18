import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crowdfunding API",
      version: "1.0.0",
      description: "API for crowdfunding platform"
    },
    servers: [
      {
        url: "http://localhost:1010"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;