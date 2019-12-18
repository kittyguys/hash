import sql, { pool } from "../configs/mysql";

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

export const createStock = async (req, res, next) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const { id } = req.user;
    const { content } = req.body
    const query = {
      user_id: id,
      content
    };
    const stock = {
      id: null,
      content: query.content
    }
    const rows = await connection.query("INSERT INTO stocks SET ?", query);
    const updatedStock = await connection.query("UPDATE stocks SET sequence = ? WHERE id = ?", [rows[0].insertId, rows[0].insertId]);
    await connection.commit();
    stock.id = updatedStock.insertId;
    return res.json({ stock });
  } catch (err) {
    await connection.rollback();
    next(err);
  } finally {
    connection.release();
  }
};