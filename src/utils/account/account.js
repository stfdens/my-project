const MapDbToModelAccount = ({
  id,
  username,
  status,
  email,
  created_at,
  updated_at,
}) => ({
  id,
  username,
  status,
  email,
  createdat: created_at,
  updatedat: updated_at,
});

module.exports = MapDbToModelAccount;
