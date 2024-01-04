import { Account, Client, ID, Databases, Storage, Query } from "appwrite";
const client = new Client();
const account = new Account(client);
const storage = new Storage(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6583e16c567c439db7a0");

export async function createUser(email, password) {
  const promise = await account.create(ID.unique(), email, password).then(
    (res) => {
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

export async function login(email, password) {
  const promise = await account.createEmailSession(email, password).then(
    async (res) => {
      const userObj = await databases
        .listDocuments("658ba04b78b3bf0e2acb", "6592e76772dc7d2cbb3c", [
          Query.equal("email", [email]),
        ])
        .then((res) => {
          if (res.total != 0) {
            return {
              email: res.documents[0].email,
              name: res.documents[0].name,
              id: res.documents[0].$id,
              resumeId: res.documents[0].resumeID,
              contact: res.documents[0].contact,
              resume: res.documents[0].resume_name,
            };
          } else {
            return {
              email: email,
            };
          }
        });
      return {
        success: true,
        user: userObj,
      };
    },
    (err) => {
      console.log(err);
      return false;
    }
  );
  return promise;
}

export async function getJobs() {
  const promise = await databases
    .listDocuments("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5")
    .then(
      (res) => {
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
  const promise = await storage
    .createFile("6592e689ed7b2df61bc6", ID.unique(), file)
    .then(
      (res) => {
        return {
          success: true,
          id: res.$id,
          name: file.name,
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

export async function deleteResume(fileId) {
  const promise = await storage.deleteFile("6592e689ed7b2df61bc6", fileId).then(
    (res) => {
      return {
        success: true,
      };
    },
    (err) => {
      console.log(err);
      return {
        success: false,
      };
    }
  );
  return promise;
}

export async function getUserRecord(
  email,
  name,
  contact,
  resumeID,
  resume_name
) {
  const checkUser = await databases
    .listDocuments("658ba04b78b3bf0e2acb", "6592e76772dc7d2cbb3c", [
      Query.equal("email", [email]),
    ])
    .then(
      (res) => {
        if (res.total == 0) {
          return databases
            .createDocument(
              "658ba04b78b3bf0e2acb",
              "6592e76772dc7d2cbb3c",
              ID.unique(),
              {
                email: email,
                name: name,
                contact: contact,
                resumeID,
                resume_name,
              }
            )
            .then(
              (res) => {
                return {
                  success: true,
                  id: res.$id,
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
        } else {
          return {
            success: true,
            id: res.documents[0].$id,
            res: res.documents[0],
          };
        }
      },
      (err) => {
        console.log(err);
        return {
          success: false,
          err,
        };
      }
    );

  return checkUser;
}

export async function updateApplicants(job_id, applicants, email) {
  applicants.push(email);
  const promise = await databases
    .updateDocument("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5", job_id, {
      applicants: applicants,
    })
    .then(
      (res) => {
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

export async function removeJob(job_id) {
  const promise = await databases
    .deleteDocument("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5", job_id)
    .then(
      (res) => {
        return true;
      },
      (err) => {
        return false;
      }
    );
  return promise;
}

export async function removeApplication(job_id, applicants, email) {
  const index = applicants.indexOf(email);
  if (index > -1) {
    applicants.splice(index, 1);
  }
  const promise = await databases
    .updateDocument("658ba04b78b3bf0e2acb", "658ba05e79e6634c2fb5", job_id, {
      applicants: applicants,
    })
    .then(
      (res) => {
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
