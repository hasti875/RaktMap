const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const User = require('../models/User'); // 1. IMPORT THE USER MODEL
const Donor = require('../models/Donor'); // Ensure this line is present
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

    await bloodRequest.save();

    // Debug: Log normalized blood group
    const normalizedBloodGroup = bloodGroup.replace(/\s+/g, '').toUpperCase();
    console.log('Normalized requested blood group:', normalizedBloodGroup);

    // Fetch all donors and filter in JS for normalized blood group match
    const allDonors = await Donor.find({});
    allDonors.forEach(donor => {
      const donorBloodGroup = donor["Blood Group"] || donor.bloodGroup;
      if (!donorBloodGroup) {
        console.warn(`Donor missing Blood Group:`, donor);
        return;
      }
      const donorNormalized = donorBloodGroup.replace(/\s+/g, '').toUpperCase();
      const donorName = donor["Student Name"] || donor.name || '[no name]';
      console.log(`Donor: ${donorName}, Raw: "${donorBloodGroup}", Normalized: "${donorNormalized}"`);
    });

    const matchingDonors = allDonors.filter(donor => {
      const donorBloodGroup = donor["Blood Group"] || donor.bloodGroup;
      if (!donorBloodGroup) return false;
      const donorNormalized = donorBloodGroup.replace(/\s+/g, '').toUpperCase();
      return donorNormalized === normalizedBloodGroup;
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
      const donorName = donor["Student Name"] || donor.name || '[no name]';
      const donorPhone = donor["Mobile No"] || donor.phone;
      if (donorPhone) {
        try {
          await sendSMS(donorPhone, message);
          smsSuccessCount++;
          console.log(`SMS sent successfully to donor: ${donorName} (${donorPhone})`);
        } catch (error) {
          console.error(`Failed to send SMS to donor ${donorName}:`, error);
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
