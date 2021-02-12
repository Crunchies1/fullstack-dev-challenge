import express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/", async (req, res) => {
  const P: number = parseFloat(req.body.initialSavings);
  var M: number = parseFloat(req.body.monthlyDepo);
  var r: number = parseFloat(req.body.interest) / 100;
  var n: number = 0;
  const select: number = parseInt(req.body.period);
  const customIntRate: number = parseFloat(req.body.custom);
  const savings: number[] = [];
  if (customIntRate != -1) {
    r = customIntRate / 100;
  }
  switch (select) {
    case 1:
      n = 1;
      M = 12 * M;
      break;
    case 2:
      n = 2;
      M = 6 * M;
      break;
    case 3:
      n = 4;
      M = 3 * M;
      break;
    default:
      n = 12;
  }
  if (r === 0) {
    for (let year = 0; year < 51; year++) {
      const saving = Math.round((M * year * n + P) * 100) / 100;
      savings.push(saving);
    }
  } else {
    for (let year = 0; year < 51; year++) {
      const principleSavings =
        Math.round(P * Math.pow(1 + r / n, year * n) * 100) / 100;
      var contributionSavings =
        Math.round(
          ((M * (Math.pow(1 + r / n, year * n) - 1)) / (r / n)) * 100
        ) / 100;
      savings.push(principleSavings + contributionSavings);
    }
  }
  res.send(savings);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
