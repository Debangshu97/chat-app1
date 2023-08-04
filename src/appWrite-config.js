import { Client, Databases ,Account} from 'appwrite';

export const PROJECT_ID ='64ca8aa8c3908bb2c558'
export const DATABASE_ID ="64ca90ab479ba4137b53";
export const COLLECTION_ID_MESSAGES="64ca90b656de75e39265"

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64ca8aa8c3908bb2c558');

export const databases= new Databases(client)
 export const account= new Account(client);

    export default  client;