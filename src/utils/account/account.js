const MapDbToModelAccount = ({
  id,
  username,
  email,
  created_at,
  updated_at,
}) => ({
  id,
  username,
  email,
  createdat: created_at,
  updatedat: updated_at,
});

module.exports = MapDbToModelAccount;
