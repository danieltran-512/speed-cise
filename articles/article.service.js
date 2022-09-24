// TODO
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Article = db.Article;

module.exports = {
  addArticle,
  getAll,
  getArticlesForWorkDistribution,
  getArticlesForSubmitter,
  getArticlesForModerator,
  getArticlesForAnalyst,
  updateArticleStatus,
  updateArticleEvidenceResult,
  delete: _delete,
};

// add an article
async function addArticle(articleParam) {
  let doc = new Article(articleParam);
  // save article
  return await doc.save();
}

// get all articles
async function getAll() {
  return await Article.find();
}

// get articles based on article status
async function getArticlesForWorkDistribution(articleParam) {
  return await Article.find({
    status: articleParam.status,
  });
}

// get articles based on submitterID
async function getArticlesForSubmitter(id) {
  return await Article.find({
    submitterID: id,
  });
}

// get articles based on moderatorID
async function getArticlesForModerator(id) {
  return await Article.find({
    moderatorID: id,
  });
}

// get articles based on analystID
async function getArticlesForAnalyst(id) {
  return await Article.find({
    analystID: id,
  });
}

// update article's status
async function updateArticleStatus(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    status: claimParam.status,
  });
}

// update article's evidence result
async function updateArticleEvidenceResult(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    evidenceResult: claimParam.evidenceResult,
  });
}

// delete article
async function _delete(id) {
  await Article.findByIdAndRemove(id);
}
