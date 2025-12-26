import mongoose, { Connection, Mongoose } from 'mongoose';

/**
 * Type-safe definition of the cached connection object that we store on `globalThis`.
 */
interface MongoCache {
  conn: Connection | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extension of the Node.js global object so TypeScript knows about our custom `mongoose` cache.
 */
interface GlobalWithMongooseCache extends Global {
  _mongoose: MongoCache | undefined;
}

// Cast `globalThis` so we can safely attach our cache.
const globalWithMongoose = globalThis as unknown as GlobalWithMongooseCache;

// Reuse the cached connection across hot reloads in development to avoid
// creating multiple connections and exhausting the database connection pool.
const cached: MongoCache = globalWithMongoose._mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose._mongoose = cached;

/**
 * Safely retrieves the MongoDB connection string from environment variables.
 * Throws a clear error at startup if the variable is missing.
 */
const getMongoUri = (): string => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable in your environment (e.g. .env.local).',
    );
  }

  return uri;
};

/**
 * Establishes (or reuses) a singleton Mongoose connection.
 *
 * - Uses a cached promise to avoid creating multiple connections
 *   during development hot reloads.
 * - Returns a fully-initialized `mongoose.Connection` instance.
 */
export const connectToDatabase = async (): Promise<Connection> => {
  if (cached.conn) {
    // If we already have an active connection, reuse it.
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = getMongoUri();

    // Configure options explicitly for clarity and forward compatibility.
    const options: Parameters<typeof mongoose.connect>[1] = {
      maxPoolSize: 10, // Reasonable default; tune based on your deployment.
    };

    cached.promise = mongoose.connect(uri, options).catch((error) => {
      // Clear the cached promise on failure so subsequent calls can retry
      cached.promise = null;
      cached.conn = null;
      throw error;
    });
  }

  const mongooseInstance = await cached.promise;

  // Store the resolved connection so subsequent calls return it directly.
  cached.conn = mongooseInstance.connection;

  return cached.conn;
};

export default connectToDatabase;
