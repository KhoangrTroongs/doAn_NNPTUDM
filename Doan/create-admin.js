const axios = require('axios');

async function setupAdmin() {
    try {
        console.log('Creating admin account...');
        const response = await axios.post('http://localhost:3001/users/setup-admin');
        console.log('✓ Success:', response.data.message);
        console.log('\nAdmin Credentials:');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('\nYou can now login with these credentials!');
    } catch (error) {
        if (error.response) {
            console.log('⚠ ', error.response.data.message);
        } else {
            console.log('✗ Error: Make sure the backend server is running on port 3001');
            console.log('  Start it with: npm start');
        }
    }
}

setupAdmin();
