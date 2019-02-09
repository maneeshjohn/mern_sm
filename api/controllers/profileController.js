const Profile = require('../models/Profile');
const User = require('../models/User');

const validation = require('../../config/validation/profileValidation');

const profileController = {

  getProfile: function(req, res){

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if(!profile) {
          return res.status(400).json({ error: 'User not found' });
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  },

  getProfileByHandle: function(req, res) {
    
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if(!profile){          
          return res.status(400).json({ error: 'This profile does not exist' });
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json({ error: 'There is no profile for this user' }));
  },

  getProfileById: function(req, res) {
    
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if(!profile){          
          return res.status(400).json({ error: 'This profile does not exist' });
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json({ error: 'There is no profile for this user' }));
  },

  getAllProfiles: function(req, res) {

    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if(!profiles) {
          return res.status(404).send({ error: 'There are no profiles' });
        }
        res.json(profiles);
      })
      .catch(err => {
        res.status(404).send({ error: 'There are no profiles' })
      });
  },

  updateProfile: function(req, res){

    const { errors, valid } = validation.updateProfileValidation(req.body);
    if(!valid) {
      return res.status(400).json(errors);
    }

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
                errors.handle = 'That handle is already taken';
                return res.status(400).json(errors);
              }
              //  Save profile
              new Profile(profileData).save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            })
        }
      })
  },
  
  addExperience: function(req, res) {

    const { errors, valid } = validation.addExperienceValidation(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const exp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.experience.unshift(exp);
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err.message));
      })
  },

  addEducation: function(req, res) {

    const { errors, valid } = validation.addEducationValidation(req.body);
    if (!valid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const edu = {
          university: req.body.university,
          institution: req.body.institution,
          stream: req.body.stream,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.education.unshift(edu);
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err.message));
      })
  },

  deleteEducation: function(req, res) {

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const deleteIndex = profile.education.map(item => item.id).indexOf(req.params.id);
        
        profile.education.splice(deleteIndex, 1);
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err.message));
      })
      .catch(err => res.status(404).json(err.message));
  },

  deleteExperience: function(req, res) {

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const deleteIndex = profile.experience.map(item => item.id).indexOf(req.params.id);
        
        profile.experience.splice(deleteIndex, 1);
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err.message));
      })
      .catch(err => res.status(404).json(err.message));
  },

  deleteProfile: function(req, res) {

    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findByIdAndRemove({ _id: req.user.id })
          .then(() => res.json({ done: true }))
          .catch(err => res.status(400).json(err.message));
      })
      .catch(err => res.status(404).json(err.message));
  }
}

module.exports = profileController;