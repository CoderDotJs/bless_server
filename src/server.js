import mongoose from 'mongoose';
import configs from './app/configs/configs.js';
import app from './app.js';

async function main() {
  try {
    await mongoose.connect(configs.mongo_uri);
    app.listen(configs.port, () => {
      console.log(`Example app listening on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
