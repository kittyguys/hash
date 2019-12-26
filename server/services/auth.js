import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../configs/mysql";

export const signup = (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      const query = {
        ...req.body,
        display_name: req.body.user_name,
        password: hash
      };
      sql.query("insert into users set ?", query, (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result) {
            const user = {
              id: users[0].id,
              user_name: users[0].user_name,
              display_name: users[0].display_name,
              email: users[0].email
            };
            const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
            return res.json({ token });
          }
        }
      });
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const password = req.body.password;
    const signinID = req.body.signinID;
    const rows = await connection
      .query("SELECT * FROM users WHERE user_name = ? LIMIT 1", [signinID])
      .then(data => {
        return data[0];
      })
      .catch(err => {
        next(err);
      });
    bcrypt.compare(password, rows[0].password, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        const user = {
          id: rows[0].id,
          user_name: rows[0].user_name,
          display_name: rows[0].display_name,
          email: rows[0].email
        };
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
        return res.json({ token });
      } else {
        return res.json({ error: "パスワードが間違ってるぞコラ" });
      }
    });
  } catch (err) {
    next(err);
  }
};
