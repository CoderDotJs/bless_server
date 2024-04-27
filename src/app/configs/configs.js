import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '/', '.env') });
const configs = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGOURI,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  cloudinary_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUD_API,
  cloudinary_secret_key: process.env.CLOUD_SECRET,
};
export default configs;
