import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "../configs/mysql";

export const signup = (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err) {
        throw new Error("errrrrr")
      }
      const query = { ...req.body, display_name: req.body.user_name, password: hash};
      sql.query("insert into users set ?", query, (err, data) => {
        if (err) {
          console.log("error: ", err);
        } else {
          const token = jwt.sign(query, process.env.JWT_SECRET_KEY);
          return res.json({ token });
        }
      });
    });
  } catch (error) {
    next(error)
  }
};