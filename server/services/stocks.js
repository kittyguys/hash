import sql from "../configs/mysql";

export const getStocks = (req, res, next) => {
  try {
    const { id } = req.user;
    sql.query("select * from stocks where user_id = ?", id, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        return res.json({ stocks: data });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createStock = (req, res, next) => {
  try {
    const { id } = req.user;
    const { content } = req.body
    const query = {
      user_id: id,
      content
    };
    sql.query("insert into stocks set ?", query, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        const stock = {
          id: data.insertId,
          content: query.content
        }
        return res.json({ stock });
      }
    });
  } catch (err) {
    next(err);
  }
};