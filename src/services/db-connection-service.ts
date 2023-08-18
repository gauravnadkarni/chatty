import mongoose from 'mongoose'
import ENVIRONMENT_CONSTANTS from '../configurations/constants';

let cached = global as typeof globalThis & { 
    mongoose:{ conn: typeof mongoose | null , promise: Promise<typeof mongoose>|null }
}

if (!cached.mongoose) {
  cached.mongoose= { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn
  }

  const MONGODB_URI:string|undefined = ENVIRONMENT_CONSTANTS.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise
  } catch (e) {
    cached.mongoose.promise = null
    throw e
  }

  return cached.mongoose.conn
}

export default dbConnect