import { MongoClient } from 'mongodb';


export async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb+srv://joshua:wgJXk4XtRA3LoBTX@cluster0.csr7u.mongodb.net/next-js-auth?retryWrites=true&w=majority&appName=Cluster0");
  return client;
}