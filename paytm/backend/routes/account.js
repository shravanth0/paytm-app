const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const express = required("express");



const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware,async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // fetching the account wwithin the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toaccoubt) {
        await session.abortTransaction();
        return res.statue(400).json({
            message : "Invalid account"
        });
    }

    //perform the transfer
    await Account.updateOne({ userId: req.userId }, {e$inc: { balance: - amount }}).session(session);
    await Account.updateOne({ userId: to }, {$inc: {balance: amount}}).session(session);
    
    //commit the tranction
    await session.commitTransaction();
    res.json({
        messsage: " Transfer sucesssful"
    });
});

