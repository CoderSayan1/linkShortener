import { URL } from "../models/shortUrl.model.js";
import { User } from "../models/user.model.js";

const handleNewShortUrl = async (req, res) => {
  try {
    console.log("The original url is: ", req.body.originalUrl);
    const { originalUrl } = req.body;
    const { userid } = req.body;
    const urlFound = await URL.find({
      originalUrl,
    });
    if (urlFound.length > 0) {
      res.status(409); // If the same url is present in DB then it shows
      res.send(urlFound);
    } else {
      const shortUrl = await URL.create({
        originalUrl,
        user:userid
      });
      if (shortUrl) {
        await User.updateOne({ _id: userid }, { shortUrl:[shortUrl] });
      }
      // console.log(shortUrl);
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

const getAllUrl = async (req, res) => {
  try {
    const shortUrls = await URL.find({user:req.params.id2});
    // const shortUrls = await URL.find();
    if (shortUrls.length < 0) {
      res.status(404).send({
        message: "No short urls found",
      });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

const handleTotalClicks = async (req, res) => {
  try {
    const shortUrl = await URL.findOne({
      shortUrl: req.params.id,
    });
    // console.log(req.params.id);
    if (!shortUrl) {
      res.status(404).send({
        message: "Original url not found",
      });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.originalUrl}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

export { handleNewShortUrl, handleTotalClicks, getAllUrl };
