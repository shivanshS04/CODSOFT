import { Account, Client, ID, Databases } from "appwrite";
import useAuthStore from "./zustand/authStore";
const client = new Client();
const account = new Account(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6583e16c567c439db7a0");

export async function createUser(email, password) {
  const promise = await account.create(ID.unique(), email, password).then(
    (res) => {
      console.log(res);
      return true;
    },
    (err) => {
      console.log(err);
      return false;
    }
  );
  return promise;
}

export async function login(email, password) {
  const promise = await account.createEmailSession(email, password).then(
    (res) => {
      console.log(res);
      return true;
    },
    (err) => {
      console.log(err);
      return false;
    }
  );
  return promise;
}

const databases = new Databases(client);

export async function getJobs() {
  const promise = await databases
    .listDocuments("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5")
    .then(
      (res) => {
        console.log(res.documents);
        return res.documents;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  return promise;
}
