const app = require('./index.js');
const db = require('../database/index.js');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-west-1'
})

const s3 = new AWS.S3();

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, 
  'Content-Type': 'application/json'
};

module.exports = {

  respondOptions: function(req, res) {
    res.set(headers).sendStatus(200);
  },

  usersFollowing: function(req, res) {
    db.getUsersFollowing(1) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('getUsersFollowing had an error', err);
      });
  },

  usersFollowers: function(req, res) {
    db.getUsersFollowers(1) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('getUsersFollowers had an error', err);
      });
  },

  feed: function(req, res) {
    db.getAllPosts(3) //CURRENTLY HARD CODED USER ID, change to req.body
      .then((results) => {
        let posts = results.rows;
        db.getPostsLiked(1)
          .then((likeResult) => {
            let likedPosts = likeResult.rows.map(result => { return result.post_id; });
            posts.forEach(post => {
              likedPosts.includes(post.post_id) ? post.liked = false : post.liked = true;
            });
            res.json(posts);
          });
      })
      .catch((err) => {
        console.log('feed had an error', err);
      });
  },

  insertPost: function(req, res) {
    s3.putObject({
      Bucket: 'lawa-ig',
      Key: 'images/' + req.file.originalname,
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err, result) => {
      console.log(result);
    })
    db.insertPost(req.body.caption, req.file)
      .then(res.sendStatus(201))
      .catch(err => {
        console.log('insertPost had an error');
      });
    console.log(req);
  },
  //for autocomplete search bar
  allUserNames: function(req, res) {
    db.getAllUsernames()
      .then(allUserNames =>{
        let profileNames = allUserNames.rows.map(profileName => {
          return {'name': profileName.user_id, 'label': profileName.name};
        });
        res.json(profileNames);
      });
  }, 

  //for profile page view
  currentUserProfile: function(req, res) {
    
    userId = req.body.username;
    console.log('user id is ', userId);

    db.getUserProfile(userId)
      .then(currentUserProfile => { 
        var currentUserProfile = currentUserProfile.rows[0];
        db.getUserPosts(userId)
          .then(currentUserPosts => {     
            currentUserProfile.posts = currentUserPosts.rows;
            db.getUsersFollowing(userId)
              .then(usersFollowing => {
                currentUserProfile.following = usersFollowing.rows;
                db.getUsersFollowers(userId)
                  .then(usersFollowers => {
                    currentUserProfile.followers = usersFollowers.rows;
                    console.log(currentUserProfile);
                    res.json(currentUserProfile);
                  });
              });
          });
      });
  }
}

