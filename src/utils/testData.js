// Test data initialization
export const initializeTestData = () => {
  // Create test users if they don't exist
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.length === 0) {
    const testUsers = [
      {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(testUsers));
  }
};