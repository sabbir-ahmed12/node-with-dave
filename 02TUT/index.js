// const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

// Reading file
// fs.readFile(path.join(__dirname, "files", "starter.txt"), (err, data) => {
//   if (err) console.log(err);
//   console.log(data.toString());
// });

// CALLBACK HELL
// Writing a new file
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Hello Node.js",
//   (err) => {
//     if (err) throw err;
//     console.log("Write Complete.");

//     // Appending a file if exists or create
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "I'm coming for you.",
//       (err) => {
//         if (err) throw err;
//         console.log("Append done.");

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "new reply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("File Renamed.");
//           }
//         );
//       }
//     );
//   }
// );

// USING PROMISES
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);

    // DELETING STARTER.txt
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "asyncWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "asyncWrite.txt"),
      "\n\nNice to meet you promise."
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "asyncWrite.txt"),
      path.join(__dirname, "files", "promiseWritten.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWritten.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
