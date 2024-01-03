import sequelize from './database/index.js';
import app from './app.js';

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/// Starting the backend
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Failed to start the server:`, error);
  }
  console.info(`Server is running on port: ${PORT}`);
});
