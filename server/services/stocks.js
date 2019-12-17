import sql from "../configs/mysql";

export const getStocks = (req, res, next) => {
  try {
    const { id } = req.user;
    sql.query("SELECT * FROM stocks WHERE user_id = ?", id, (err, data) => {
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
    sql.query("INSERT INTO stocks (user_id, content, sequence) SELECT (user_id, content, COUNT(*)) FROM stocks WHERE user_id=1", query, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        return res.json({ stocks: data });
      }
    });
    // sql.query("INSET INTO stocks SET ?", query, (err, data) => {
    //   if (err) {
    //     console.log("error: ", err);
    //   } else {
    //     const stock = {
    //       id: data.insertId,
    //       content: query.content
    //     }
    //     sql.query("UPDATE stocks SET sequence = ? WHERE id = ?", [data.insertId, data.insertId], (err, data) => {
    //       if (err) {
    //         console.log("error: ", err);
    //       } else {
    //         return res.json({ stock });
    //       }
    //     });
    //   }
    // });
  } catch (err) {
    next(err);
  }
};