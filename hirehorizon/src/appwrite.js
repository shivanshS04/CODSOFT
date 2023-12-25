import { Account, Client, ID } from "appwrite";
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
