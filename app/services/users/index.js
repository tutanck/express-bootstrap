const User = require('../../models/User');
const { paginate } = require('../../utils/pagination');

const list = async (page = 1, perPage = 5, search) => {
  const baseQuery = User.find(
    search ? { $text: { $search: search } } : undefined,
  );

  const { metas, query } = await paginate(baseQuery, page, perPage, {
    updated_at: -1,
  });

  const users = await query;

  return {
    ...metas,
    items: users,
  };
};

module.exports = {
  list,
};
