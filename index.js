const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const fillDataBaseFromApi = require('./src/middlewares/fillDb.js');

// Syncing all the models at once.
const port = 3007;

server.listen(port, async () =>{
  console.log(`%s listening at ${port}`)

  try {
    await conn.sync({force: false});
    await fillDataBaseFromApi();
    console.log('Base de datos llenada exitosamente')
  } catch (error) {
    console.error('Error al llenar la base de datos:', error)
  }
})
