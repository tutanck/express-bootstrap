const { paginate } = require('../../utils/pagination');
const User = require('../../models/User');
const { list } = require('./index');
const { users } = require('../../../__tests__/utils/users.test-utils');

jest.mock('../../utils/toolbox');
jest.mock('../../utils/pagination');
jest.mock('../../models/User');

describe('list', () => {
  const page = 2,
    perPage = 10,
    query = Promise.resolve(users),
    searchText = 'Joan',
    metas = {
      current_page: page,
      total_count: users.length,
      page_count: Math.ceil(users.length / perPage),
    };

  beforeEach(() => {
    User.find.mockResolvedValue(users);

    paginate.mockResolvedValue({ metas, query });
  });

  it(`
    should find all users;
    then paginate the results;
    `, async () => {
    // call
    const result = await list(page, perPage, searchText);

    // expectations
    expect(User.find).toHaveBeenCalledWith({ $text: { $search: searchText } });
    expect(paginate).toHaveBeenCalledWith(query, page, perPage, {
      updated_at: -1,
    });
    expect(result).toEqual({ ...metas, items: users });
  });
});
