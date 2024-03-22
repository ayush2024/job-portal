import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "ddzfclydk",
  api_key: "548818459423758",
  api_secret: "qSrSgNABZ38n6kMDRIadLvnVh5E",
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});