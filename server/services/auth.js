import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "../configs/mysql";

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
      sql.query("insert into users set ?", query, (err, data) => {
        if (err) {
          console.log("error: ", err);
        } else {
          const token = jwt.sign(query, process.env.JWT_SECRET_KEY);
          return res.json({ token });
        }
      });
    });
  } catch (err) {
    next(err);
  }
};

export const signin = (req, res, next) => {
  try {
    const password = req.body.password;
    const signinID = req.body.signinID;
    sql.query(
      "SELECT * FROM users WHERE user_name = ? LIMIT 1",
      [signinID],
      (err, users) => {
        console.log(users)
        if (err) {
          console.log("error: ", err);
        } else {
          bcrypt.compare(password, users[0].password, (err, result) => {
            if (err) {
              throw err;
            }
            if (result) {
              const user = {
                user_name: users[0].user_name,
                display_name: users[0].display_name,
                email: users[0].email
              };
              const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
              return res.json({ token });
            }
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
