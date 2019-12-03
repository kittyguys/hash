export const getUsers = async (req, res, next) => {
  try {
    return res.json({ status: "ok" });
  } catch (error) {
    return null;
  }
};
