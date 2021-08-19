const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;

      await link.save();

      return res.redirect(link.to);
    }

    res.status(404).json({ message: "Could not find the link" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
});

module.exports = router;
