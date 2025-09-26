const { app } = require('@azure/functions');

app.http('register', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Registration request received`);

        try {
            // Parse the request body
            const body = await request.text();
            const registrationData = JSON.parse(body);

            // Validate required fields
            const { name, city, postcode, email, password } = registrationData;

            if (!name || !city || !postcode || !email || !password) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'All fields are required'
                    })
                };
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Invalid email format'
                    })
                };
            }

            // Basic password validation
            if (password.length < 8) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Password must be at least 8 characters'
                    })
                };
            }

            // Here you would typically:
            // 1. Hash the password
            // 2. Check if email already exists
            // 3. Save to database
            // 4. Send confirmation email
            
            // For now, we'll just log the data and return success
            context.log('Registration data:', {
                name,
                city,
                postcode,
                email,
                passwordLength: password.length
            });

            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({
                    success: true,
                    message: 'Registration successful',
                    user: {
                        name,
                        city,
                        postcode,
                        email
                    }
                })
            };

        } catch (error) {
            context.log('Registration error:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Internal server error'
                })
            };
        }
    }
});
