const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const router = Router();
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.id });

    res.status(200).json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    res.status(200).json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    const { to } = req.body;

    const code = shortid.generate();

    const linkExists = await Link.findOne({ to });

    if (linkExists) {
      return res.status(200).json({ link: linkExists });
    }

    const from = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.id,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

module.exports = router;
