import sql from "../configs/mysql";

export const getUsers = async (req, res, next) => {
  try {
    return res.json({ status: "ok" });
  } catch (error) {
    return null;
  }
};

export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.user;
    const { user_name, display_name, profile_image, email } = req.body;
    const columns = { user_name, display_name, profile_image_url: "", email };
    sql.query("UPDATE users SET ? where id = ?", [columns, id], (err, data) => {
      if (err) {
        next(err);
      } else {
        return res.json({ data });
      }
    });
  } catch (err) {
    next(err.message);
  }
};
