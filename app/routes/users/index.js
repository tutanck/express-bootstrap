const { Router } = require('express');
const { query, validationResult } = require('express-validator');
const { validateRequest } = require('../../utils/validation');
const { list } = require('../../services/users');

const router = Router();

router.get(
  '/list',

  [
    query('page')
      .optional()
      .isInt({ min: 1 }),
    query('perPage')
      .optional()
      .isInt({ min: 1 }),
    query('search').optional(),
  ],

  async (req, res) => {
    validateRequest(validationResult(req));

    let { page, perPage, search } = req.query;

    const result = await list(page, perPage, search);

    return res.status(200).json(result);
  },
);

module.exports = router;
