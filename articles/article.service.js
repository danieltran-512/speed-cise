// TODO
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Article = db.Article;

module.exports = {
  addArticle,
  getAll,
  getArticlesBasedOnClaims,
  getArticlesForModeratorDistribution,
  getArticlesForAnalystDistribution,
  getArticlesForSubmitter,
  getArticlesForModerator,
  getArticlesForAnalyst,
  updateArticleStatus,
  updateArticleModeratorID,
  updateArticleAnalystID,
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

//get articles based on claims
async function getArticlesBasedOnClaims(id) {
  return await Article.find({
    status: "analysed",
    claimID: id,
  });
}

// get articles based on article status (moderator)
async function getArticlesForModeratorDistribution() {
  return await Article.find({
    status: "submitted",
    moderatorID: { $exists: false },
  });
}

// get articles based on article status (analyst)
async function getArticlesForAnalystDistribution() {
  return await Article.find({
    status: "moderated",
    analystID: { $exists: false },
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
    status: "submitted",
    moderatorID: id,
  });
}

// get articles based on analystID
async function getArticlesForAnalyst(id) {
  return await Article.find({
    status: "moderated",
    analystID: id,
  });
}

// update article's status
async function updateArticleStatus(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    status: articleParam.status,
  });
}

// update article's moderatorID
async function updateArticleModeratorID(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    moderatorID: articleParam.moderatorID,
  });
}

// update article's analystID
async function updateArticleAnalystID(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    analystID: articleParam.analystID,
  });
}

// update article's evidence result
async function updateArticleEvidenceResult(articleParam) {
  return await Article.findByIdAndUpdate(articleParam.id, {
    evidenceResult: articleParam.evidenceResult,
  });
}

// delete article
async function _delete(id) {
  await Article.findByIdAndRemove(id);
}
