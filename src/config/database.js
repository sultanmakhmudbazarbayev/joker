import path from 'path';

const currentPath = __dirname;
const databasePath = path.join(currentPath, '../..');

module.exports = {
  dialect: 'sqlite',
  storage: databasePath + '/prod.db',
  logging: false
}
