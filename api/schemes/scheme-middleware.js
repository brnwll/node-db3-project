const db = require("../../data/db-config");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  try {
    const scheme = await db("schemes").where("scheme_id", scheme_id).first();
    if (scheme) {
      next();
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (!scheme_name || typeof scheme_name !== "string") {
    res.status(400).json({ message: "invalid scheme_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    !instructions ||
    typeof instructions !== "string" ||
    typeof step_number !== "number" ||
    step_number < 1
  ) {
    res.status(400).json({ message: "invalid step" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};

/*
const db = require('../../data/db-config')

module.exports = {
  async checkUserId(req, res, next) {
    const user = await db('users').where('id', req.params.id).first()
    if (user) {
      next()
    } else {
      next({ message: 'Could not find user with given id.', status: 404 })
    }
  },
  checkUserData(req, res, next) {
    if (!req.body.username || !req.body.username.trim()) {
      next({ message: 'Could not create user without a username.', status: 400 })
    } else {
      req.body.username = req.body.username.trim()
      next()
    }
  }
}

*/
