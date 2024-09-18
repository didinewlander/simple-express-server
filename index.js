const express = require("express");
// import * as express from 'express';
require("dotenv").config();
const app = express();

app.use(express.json());

//middleware - function that is called when a request is made

const changePoweredBy = (req, res, next) => {
  const power = res.getHeader("x-powered-by");
  if (power === "Express") {
    res.setHeader("x-powered-by", process.env.ENV_TYPE);
  }
  next();
};

app.use(changePoweredBy);

app.use("/", (req, res) => {
  const url = req.url;
  const power = res.getHeader("x-powered-by");
  const response = {
    status: 200,
    message: "Welcome to my API",
    data: {
      url: url,
      "x-powered-by": power,
    },
  };
  res.json(response);
});

app.use("/cloud", (req,res)=>{
    const response = {
        status: 200,
        message: "Welcome to the Cloud API",
        data: {
            url: req.url,
            "x-powered-by": process.env.ENV_TYPE,
        },
    };
    res.json(response);
})

app.listen(process.env.PORT || 3000, () =>
  console.log("Listening on port: " + process.env.PORT)
);
