
const express = require("express");
const { createSeller, loginSeller, addProduct,checkShopNameAvailability } = require("../Controllers/sellerController");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.post("/create", createSeller);
router.post("/login", loginSeller);

router.post("/add-product/:sellerId", authenticateUser, addProduct); // Protect this route
router.get("/check-shop-name/:shopName", checkShopNameAvailability);
router.get("/:id", authenticateUser, async (req, res) => {

    try {
      const seller = await Seller.findById(req.params.id).select('-password'); // Exclude password from response
      if (!seller) {
        return res.status(404).json({ msg: "Seller not found" });
      }
      
      res.status(200).json({ sellerData: seller });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  });
  
module.exports = router;
