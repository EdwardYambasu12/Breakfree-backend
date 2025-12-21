const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://sportsup14:a4gM6dGvo7SHk9aX@cluster0.db0ee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'breakfree@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    const adminUser = await User.create({
      email: 'breakfree@gmail.com',
      password: hashedPassword,
      name: 'Ministry Admin',
      role: 'admin',
      isActive: true
    });

    adminUser.save()

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@ministry.com');
    console.log('🔑 Password: Admin123!');
    console.log('⚠️  IMPORTANT: Change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();