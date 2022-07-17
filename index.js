const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Dog breed:${data}`);

  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    if (err) return console.log(err);
    console.log(res.body.message);

    fs.writeFile("dog-image.txt", res.body.message, (err) => {
      if (err) return console.log(err);
    });
  });
});
