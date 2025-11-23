const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Team = require('./models/Team');
const Job = require('./models/Job');

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // Ensure there are teams; create sample teams if none
    let teams = await Team.find();
    if (teams.length === 0) {
      console.log('No teams found — creating sample teams...');
      const created = await Team.insertMany([
        {
          email: 'soundco@example.com',
          password: 'Password123',
          phone: '123-456-7890',
          teamName: 'Sound Co',
          categories: ['Entertainment'],
          locations: ['Austin, TX'],
          bio: 'Professional audio engineers',
          verified: true
        },
        {
          email: 'cateringpro@example.com',
          password: 'Password123',
          phone: '987-654-3210',
          teamName: 'Catering Pro',
          categories: ['Catering'],
          locations: ['Austin, TX'],
          bio: 'Festival catering specialists',
          verified: true
        }
      ]);
      teams = created;
    }

    // Create sample jobs for each team
    const jobsToCreate = [];
    teams.forEach((team, idx) => {
      jobsToCreate.push({
        team: team._id,
        role: idx % 2 === 0 ? 'Sound Technician' : 'Catering Assistant',
        requirements: {
          age: '18+',
          skills: idx % 2 === 0 ? 'Audio setup, mixing' : 'Food handling, service',
          responsibilities: idx % 2 === 0 ? 'Setup PA, monitor sound' : 'Assist food prep and service'
        },
        location: team.locations && team.locations.length ? team.locations[0] : 'Austin, TX',
        pay: idx % 2 === 0 ? '$150/day' : '$120/day',
        urgent: false
      });
    });

    const createdJobs = await Job.insertMany(jobsToCreate);

    // Attach jobs to teams
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const job = createdJobs[i];
      team.jobs = team.jobs || [];
      team.jobs.push(job._id);
      await team.save();
    }

    console.log(`Seeded ${createdJobs.length} jobs for ${teams.length} teams.`);
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
