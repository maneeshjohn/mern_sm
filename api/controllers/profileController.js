const Profile = require('../models/Profile');
const User = require('../models/User');

const profileController = {
  getProfile: function(req, res){
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(!profile) {
          return res.status(400).json({error: 'User not found'});
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  },

  updateProfile: function(req, res){
    const profileData = {};
    profileData.user = req.user.id;

    if(req.body.handle) profileData.handle = req.body.handle;
    if(req.body.website) profileData.website = req.body.website;
    if(req.body.location) profileData.location = req.body.location;
    if(req.body.position) profileData.position = req.body.position;
    if(req.body.bio) profileData.bio = req.body.bio;
    if(req.body.github) profileData.github = req.body.github;
    // Handle skills csv
    if(typeof req.body.skills !== undefined) profileData.skills = req.body.skills.split(',');
    profileData.social = {};
    if(req.body.facebook) profileData.social.facebook = req.body.facebook;
    if(req.body.twitter) profileData.social.twitter = req.body.twitter;
    if(req.body.instagram) profileData.social.instagram = req.body.instagram;
    if(req.body.linkedin) profileData.social.linkedin = req.body.linkedin;
    if(req.body.youtube) profileData.social.youtube = req.body.youtube;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(profile) {
          //  Update profile
          Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileData }, { new: true })
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        } else {
          //  Create new profile
          //  Check if handle is taken
          Profile.findOne({ handle: profileData.handle })
            .then(profile => {
              if(profile) {
                return res.status(400).json({ handle: 'That handle is already taken'});
              }
              //  Save profile
              new Profile(profileData).save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            })
        }
      })
  }
}

module.exports = profileController;