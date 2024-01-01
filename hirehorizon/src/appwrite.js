import { Account, Client, ID, Databases, Storage } from "appwrite";
const client = new Client();
const account = new Account(client);
const storage = new Storage(client);
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

export async function createJob(
  job_title,
  company,
  description,
  expected_salary,
  location,
  owner
) {
  const date = new Date();
  const promise = await databases
    .createDocument(
      "658ba04b78b3bf0e2acb",
      "658ba05e79e6634c2fb5",
      ID.unique(),
      {
        job_title: job_title,
        expected_salary: expected_salary,
        owner: owner,
        applicants: [],
        description: description,
        location: location,
        posted_on: date.toISOString(),
        company: company,
      }
    )
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          res,
        };
      },
      (err) => {
        console.log(err);
        return { success: false, err };
      }
    );

  return promise;
}

export async function getJobDetails(job_id) {
  const promise = await databases
    .getDocument("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5", job_id)
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          res,
        };
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );
  return promise;
}

export async function uploadResume(file) {
  const id = ID.unique();
  const promise = await storage
    .createFile("6592e689ed7b2df61bc6", id, file)
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          id,
          res,
        };
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );
  return promise;
}

export async function updateResume(resumeId, file) {
  const promise = await storage
    .updateFile("6592e689ed7b2df61bc6", resumeId, file)
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          res,
        };
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );
  return promise;
}

export async function addUserRecord(email, name, contact, resumeID) {
  const promise = await databases
    .createDocument(
      "658ba04b78b3bf0e2acb",
      "6592e76772dc7d2cbb3c",
      ID.unique(),
      {
        email: email,
        name: name,
        contact: contact,
        resumeID,
      }
    )
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          res,
        };
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );

  return promise;
}

export async function updateApplicants(job_id, email) {
  const promise = await databases
    .updateDocument("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5", job_id, {
      applicants: [email],
    })
    .then(
      (res) => {
        console.log(res);
        return {
          success: true,
          res,
        };
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );
  return promise;
}
