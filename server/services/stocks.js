import sql from "../configs/mysql";

export const getStock = (req, res, next) => {
  try {
    const { id } = req.user;
    sql.query("select * from stocks where user_id = ?", id, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        return res.json({ data });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createStock = (req, res, next) => {
  try {
    const { id } = req.user;
    const query = {
      user_id: id,
      content: "this is a testing text"
    };
    sql.query("insert into stocks set ?", query, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        return res.json({ data });
      }
    });
  } catch (err) {
    next(err);
  }
};