import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(
  "mongodb://hireloopAdmin:nb1fXWhsqMLPMACE@ac-p4mwva5-shard-00-00.tiw02ei.mongodb.net:27017,ac-p4mwva5-shard-00-01.tiw02ei.mongodb.net:27017,ac-p4mwva5-shard-00-02.tiw02ei.mongodb.net:27017/?ssl=true&replicaSet=atlas-8cmt6h-shard-0&authSource=admin"
)
const db = client.db("hireLoopDb")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
})
