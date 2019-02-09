import {
  Stitch,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk';
const client = Stitch.initializeDefaultAppClient('cesperanceapp-iivvt');
const webDB = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('cesperance_web')
const cDB = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('cesperance')

export { client, webDB, cDB }