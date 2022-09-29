const express = require("express");
const router = express.Router();
const claimService = require("./claim.service");
const { authorize } = require("../_helpers/authorize");

// routes
router.get("/", getAll);
router.get("/:id", getClaimsForPractice);
router.post("/addClaim", authorize(), addClaim);
router.put("/updateClaim", authorize(), updateClaim);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function addClaim(req, res, next) {
  claimService
    .addClaim(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  claimService
    .getAll()
    .then((claims) => res.json(claims))
    .catch((err) => next(err));
}

function getClaimsForPractice(req, res, next) {
  claimService
    .getClaimsForPractice(req.params.id)
    .then((claims) => res.json(claims))
    .catch((err) => next(err));
}

function updateClaim(req, res, next) {
  claimService
    .updateClaim(req.body)
    .then((claims) => (claims ? res.json(claims) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  claimService
    .delete(req.params.id)
    .then((claims) => (claims ? res.json(claims) : res.sendStatus(404)))
    .catch((err) => next(err));
}
