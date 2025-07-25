const mongoose = require('mongoose');
const Donor = require('../models/Donor');

async function resetDonors() {
  await mongoose.connect('mongodb://localhost:27017/raktmap'); // Replace with your actual MongoDB URI

  // Remove all existing donors
  await Donor.deleteMany({});

  // Insert 5 new donors (edit as needed)
  await Donor.insertMany([
    {
      name: "Meghansh Pranaybhai Thakker",
      rollNo: "D24CE184",
      bloodGroup: "AB -",
      phone: "+919909055454",
      email: "d24ce184@charusat.edu.in",
      password: "password123"
    },
    {
      name: "Ekta Bhaveshbhai Dodiya",
      rollNo: "D24CE161",
      bloodGroup: "AB +",
      phone: "+918866040144",
      email: "d24ce161@charusat.edu.in",
      password: "password123"
    },
    {
      name: "Hasti Kalariya",
      rollNo: "D24CE157",
      bloodGroup: "A -",
      phone: "+917359799476",
      email: "d24ce157@charusat.edu.in",
      password: "password123"
    },
    {
      name: "Test Donor 4",
      rollNo: "D24CE999",
      bloodGroup: "O +",
      phone: "+911234567890",
      email: "test4@charusat.edu.in",
      password: "password123"
    },
    {
      name: "Test Donor 5",
      rollNo: "D24CE998",
      bloodGroup: "B -",
      phone: "+919876543210",
      email: "test5@charusat.edu.in",
      password: "password123"
    }
  ]);

  console.log('Donors collection reset to 5 records.');
  await mongoose.disconnect();
}

resetDonors();
