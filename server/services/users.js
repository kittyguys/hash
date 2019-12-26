import sql from "../configs/mysql";
import { s3 } from "../configs/aws";
import fs from "fs";

export const getUsers = async (req, res, next) => {
  try {
    return res.json({ status: "ok" });
  } catch (error) {
    return null;
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const params = {
      Bucket: "hachet-stock-test",
      CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-northeast-1"
      }
    };

    // s3.createBucket(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   else console.log("Bucket Created Successfully", data.Location);
    // });

    const uploadFile = fileName => {
      // Read content from the file
      console.log(__dirname);
      const fileContent = fs.readFileSync(__dirname + "/seattle.jpg");

      // Setting up S3 upload parameters
      const params = {
        Bucket: "hachet-stock-test",
        Key: "seattle.jpg", // File name you want to save as in S3
        Body: fileContent
      };

      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    };
    uploadFile();

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
    console.log(err.message);
    next(err.message);
  }
};
