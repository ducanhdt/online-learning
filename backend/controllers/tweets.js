const Tweet = require('../models/tweet');
//const jwt = require("jsonwebtoken");

const createTweet = async function (req, res) {
    console.log("hello")
    //console.log(req.body)
    const {room, user,tweet } = req.body;
    console.log(room);
    let tweetinit = await Tweet.create({
        class: room,
        text: tweet,
        user: user
    });
    console.log(tweetinit)
        // let foundUser = await db.User.findById(req.params.id);
        // foundUser.tweets.push(tweet.id);
        // await foundUser.save();
        // let newTweet = await db.Tweet.findById(tweet.id).populate("user", {
        //     username: true,
        //     profileImgURL: true,
        //     id: true
        // })

    res.send('successfully.');

};

const getTweet = async function (req, res, next) {
    try {
        let tweet = await db.Tweet.findById(req.params.tweet_id);
        return res.status(200).json(tweet);
    }
    catch (err) {
        return next(err);
    }
};

const deleteTweet = async function (req, res, next) {
    try {
        let foundTweet = await db.Tweet.findById(req.params.tweet_id);
        await foundTweet.remove();
        return res.status(200).json(foundTweet);
    }
    catch (err) {
        return next(err);
    }
};

const getAllTweets = async  (req, res) => {
        
        const classId = req.params.classid;
        
        let tweets = await Tweet
            .find({class:classId})
            .sort({createdAt: 1});
        
        return res.send({ status: 1, result: tweets });

};

module.exports = {
    createTweet,
    getTweet,
    deleteTweet,
    getAllTweets,
};
  