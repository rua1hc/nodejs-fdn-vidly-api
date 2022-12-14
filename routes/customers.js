const express = require("express");
const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");

const router = express.Router();

// ********* GET
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
});

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send("The given customer ID not found");

    res.send(customer);
});

// ********* POST
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    // try {
    await customer.save();
    res.send(customer);
    // } catch (ex) {
    //     for (const err in ex.errors) {
    //         console.log(ex.errors[err].message);
    //     }
    // }
});

// ********* PUT
router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
        },
        { new: true }
    );
    if (!customer)
        return res.status(404).send("The given customer ID not found");

    res.send(customer);
});

// ********* DELETE
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res.status(404).send("The given customer ID not found");

    res.send(customer);
});

module.exports = router;
