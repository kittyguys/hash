import sql from "../configs/mysql";

export const signup = (_, res) => {
  try {
    sql.query("Select * from users ", (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        return res.json({ data });
      }
    });
  } catch (error) {
    return null;
  }
};
