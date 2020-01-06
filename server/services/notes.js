import pool from "../configs/mysql";

export const getNote = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { note_id } = req.params;
    const stocks = await connection
      .query(
        "SELECT * FROM stocks JOIN notes_stocks ON notes_stocks.stock_id = stocks.id AND notes_stocks.note_id = ?",
        [note_id]
      )
      .then(data => {
        return data[0];
      })
      .catch(err => {
        next(err);
      });
    return res.json({ stocks });
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { id } = req.user;
    const { title } = req.body;
    const query = {
      user_id: id,
      title
    };
    const note = {
      id: null,
      title
    };
    const rows = await connection
      .query("INSERT INTO notes SET ?", query)
      .then(data => {
        return data[0];
      })
      .catch(err => {
        throw err;
      });
    note.id = "" + rows.insertId;
    return res.json({ note });
  } catch (err) {
    next(err);
  }
};

export const addStock = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const { note_id } = req.params;
    const { stock_id } = req.body;
    const query = {
      note_id,
      stock_id
    };
    await connection
      .query("INSERT INTO notes_stocks SET ?", query)
      .then(data => {
        return data[0];
      })
      .catch(err => {
        throw err;
      });
    return res.send(200);
  } catch (err) {
    next(err);
  }
};
