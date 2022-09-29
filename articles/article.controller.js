// TODO
const express = require("express");
const router = express.Router();
const articleService = require("./article.service");
const { authorize } = require("../_helpers/authorize");

// routes
router.get("/", getAll);
router.get("/:id", getArticlesBasedOnClaims);

router.get(
  "/getArticlesForWorkDistribution",
  authorize(),
  getArticlesForWorkDistribution
);
router.get(
  "/getArticlesForSubmitter/:id",
  authorize(),
  getArticlesForSubmitter
);
router.get(
  "/getArticlesForModerator/:id",
  authorize(),
  getArticlesForModerator
);
router.get("/getArticlesForAnalyst/:id", authorize(), getArticlesForAnalyst);
router.post("/addArticle", authorize(), addArticle);
router.put("/updateArticleStatus", authorize(), updateArticleStatus);
router.put(
  "/updateArticleEvidenceResult",
  authorize(),
  updateArticleEvidenceResult
);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addArticle(req, res, next) {
  articleService
    .addArticle(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  articleService
    .getAll()
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesBasedOnClaims(req, res, next) {
  articleService
    .getArticlesBasedOnClaims(req.params.id)
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesForWorkDistribution(req, res, next) {
  articleService
    .getArticlesForWorkDistribution(req.query)
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesForSubmitter(req, res, next) {
  articleService
    .getArticlesForSubmitter(req.params.id)
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesForModerator(req, res, next) {
  articleService
    .getArticlesForModerator(req.params.id)
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesForAnalyst(req, res, next) {
  articleService
    .getArticlesForAnalyst(req.params.id)
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function updateArticleStatus(req, res, next) {
  articleService
    .updateArticleStatus(req.body)
    .then((articles) => (articles ? res.json(articles) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateArticleEvidenceResult(req, res, next) {
  articleService
    .updateArticleEvidenceResult(req.body)
    .then((articles) => (articles ? res.json(articles) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  articleService
    .delete(req.params.id)
    .then((articles) => (articles ? res.json(articles) : res.sendStatus(404)))
    .catch((err) => next(err));
}
