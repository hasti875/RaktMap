const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const User = require('../models/User'); // 1. IMPORT THE USER MODEL
const { sendSMS } = require('../services/smsService');

// Create a new blood request
router.post('/', async (req, res) => {
  try {
    const { bloodGroup, quantity, urgency, requiredBy, description, patientAge, patientCondition } = req.body;
    const hospital = req.user; // From JWT token

    // Create and save the blood request
    const bloodRequest = new BloodRequest({
      hospitalId: hospital.id, // 2. USE hospital.id INSTEAD OF hospital._id
      bloodGroup,
      quantity,
      urgency,
      requiredBy,
      description,
      patientAge,
      patientCondition
    });
//...

    await bloodRequest.save();

    // Find donors with matching blood group
    const matchingDonors = await User.find({
      bloodGroup: bloodGroup
    });

    console.log(`Found ${matchingDonors.length} matching donors for blood group ${bloodGroup}`);

    // Prepare SMS message
    let message = `URGENT: ${bloodGroup} blood needed at ${hospital.name}.\n`;
    message += `Units needed: ${quantity}\n`;
    message += `Urgency: ${urgency}\n`;
    if (description) message += `Details: ${description}\n`;
    message += `Please respond if you can help.`;

    // Send SMS to each matching donor
    let smsSuccessCount = 0;
    for (const donor of matchingDonors) {
      if (donor.phone) {
        try {
          await sendSMS(donor.phone, message);
          smsSuccessCount++;
          console.log(`SMS sent successfully to donor: ${donor.name} (${donor.phone})`);
        } catch (error) {
          console.error(`Failed to send SMS to donor ${donor.name}:`, error);
        }
      }
    }

    // Send response with SMS status
    res.status(201).json({
      success: true,
      message: 'Blood request created successfully',
      smsStatus: {
        totalDonors: matchingDonors.length,
        smsDelivered: smsSuccessCount,
        bloodGroup: bloodGroup
      }
    });

  } catch (error) {
    console.error('Error in blood request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process blood request',
      error: error.message
    });
  }
});

module.exports = router;
