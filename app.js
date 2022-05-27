import express from "express";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

const cats = [
  {
    id: 1,
    cat: "Tony",
    human: "Liz.K",
    hobby: "cling",
  },
  {
    id: 2,
    cat: "Poppy",
    human: "Tim",
    hobby: "screm",
  },
  {
    id: 3,
    cat: "Narla",
    human: "Mell",
    hobby: "obstruct",
  },
];

export default app;
