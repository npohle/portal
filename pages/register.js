import { useState } from 'react';
import Head from 'next/head';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    postcode: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Postcode validation
    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (!/^[A-Z0-9\s-]{3,10}$/i.test(formData.postcode.trim())) {
      newErrors.postcode = 'Please enter a valid postcode';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API endpoint
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Registration successful
        setIsSuccess(true);
        setFormData({
          name: '',
          city: '',
          postcode: '',
          email: '',
          password: '',
        });
      } else {
        // Registration failed with error message
        setErrors({
          submit: result.error || 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center p-5">
        <Head>
          <title>Registration Successful - Portal</title>
        </Head>
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-text-primary mb-6">
            Registration Successful!
          </h1>
          <div className="text-center">
            <p className="text-success-green text-lg mb-6">
              Thank you for registering! Your account has been created
              successfully.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-azure-blue hover:bg-azure-blue-dark text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide"
            >
              Register Another User
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-5">
      <Head>
        <title>Register - Portal</title>
      </Head>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-3">
          Create Account
        </h1>
        <p className="text-text-secondary text-center text-sm mb-8">
          Please fill in your details to create an account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-base font-sans transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure-blue focus:ring-opacity-20 ${
                errors.name
                  ? 'border-error-red focus:border-error-red focus:ring-error-red focus:ring-opacity-20'
                  : 'border-border-light'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="text-error-red text-xs mt-1 block">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide"
            >
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-base font-sans transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure-blue focus:ring-opacity-20 ${
                errors.city
                  ? 'border-error-red focus:border-error-red focus:ring-error-red focus:ring-opacity-20'
                  : 'border-border-light'
              }`}
              placeholder="Enter your city"
            />
            {errors.city && (
              <span className="text-error-red text-xs mt-1 block">
                {errors.city}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide"
            >
              Postcode *
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-base font-sans transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure-blue focus:ring-opacity-20 ${
                errors.postcode
                  ? 'border-error-red focus:border-error-red focus:ring-error-red focus:ring-opacity-20'
                  : 'border-border-light'
              }`}
              placeholder="Enter your postcode"
            />
            {errors.postcode && (
              <span className="text-error-red text-xs mt-1 block">
                {errors.postcode}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-base font-sans transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure-blue focus:ring-opacity-20 ${
                errors.email
                  ? 'border-error-red focus:border-error-red focus:ring-error-red focus:ring-opacity-20'
                  : 'border-border-light'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="text-error-red text-xs mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-base font-sans transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azure-blue focus:ring-opacity-20 ${
                errors.password
                  ? 'border-error-red focus:border-error-red focus:ring-error-red focus:ring-opacity-20'
                  : 'border-border-light'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-error-red text-xs mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {errors.submit && (
            <div className="text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-error-red text-sm">{errors.submit}</span>
            </div>
          )}

          <button
            type="submit"
            className={`w-full font-bold py-4 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-azure-blue hover:bg-azure-blue-dark text-white'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-border-light">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-azure-blue font-bold hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
