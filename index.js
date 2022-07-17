const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File not found!");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write to file");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);

    console.log(`Dog breed:${data}`);
    const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    await writeFilePro("dog-image-pro.txt", imgs.join("\n"));
    console.log("File saved");
  } catch (error) {
    console.log(error);
  }

  return "2 : Ready";
};

(async () => {
  try {
    console.log("1 : I will get the dog pics");
    console.log(await getDogPic());
    console.log("3 : Done getting the dog pics");
  } catch (error) {
    console.log(error);
  }
})();

/*

readFilePro(`${__dirname}/dog.txt`)
.then((data) => {
    console.log(`Dog breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-image-pro.txt", res.body.message);
  })
  .then(() => {
    console.log("File saved");
  })
  .catch((err) => {
      console.log(err.message);
    });

*/
