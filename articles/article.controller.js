// TODO
const express = require("express");
const router = express.Router();
const articleService = require("./article.service");
const { authorize } = require("../_helpers/authorize");

// routes
router.get(
  "/getArticlesForModeratorDistribution",
  authorize(),
  getArticlesForModeratorDistribution
);
router.get(
  "/getArticlesForAnalystDistribution",
  authorize(),
  getArticlesForAnalystDistribution
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
router.get("/", getAll);
router.get("/:id", getArticlesBasedOnClaims);
router.post("/addArticle", authorize(), addArticle);
router.put("/updateArticleStatus", authorize(), updateArticleStatus);
router.put("/updateArticleModeratorID", authorize(), updateArticleModeratorID);
router.put("/updateArticleAnalystID", authorize(), updateArticleAnalystID);
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

function getArticlesForModeratorDistribution(req, res, next) {
  articleService
    .getArticlesForModeratorDistribution()
    .then((articles) => res.json(articles))
    .catch((err) => next(err));
}

function getArticlesForAnalystDistribution(req, res, next) {
  articleService
    .getArticlesForAnalystDistribution()
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

function updateArticleModeratorID(req, res, next) {
  articleService
    .updateArticleModeratorID(req.body)
    .then((articles) => (articles ? res.json(articles) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateArticleAnalystID(req, res, next) {
  articleService
    .updateArticleAnalystID(req.body)
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
