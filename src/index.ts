import todoSequelize from "./database/setup/database";
import app from "./server";
const { PORT } = process.env;
import swaggerUi from 'swagger-ui-express';
import express from 'express';

todoSequelize
  .sync()
  .then(() => {
    console.log("DB has been initialized");
  })
  .catch((e) => {
    console.log(e);
  });

  if (process.env.NODE_ENV === 'dev') {
    app.use(express.static('docs'));
    app.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      }),
    );
    console.log(
      `Swagger launched on at https://localhost:${
        process.env.PORT ?? ''
      }/swagger`,
    );
  }
app.listen(PORT, () => {
  console.log(`App listening from port ${PORT}`);
});
