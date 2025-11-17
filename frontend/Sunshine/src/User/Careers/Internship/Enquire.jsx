import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        college: '',
        year: '',
        purpose: '',
        hours: '',
        previousInternship: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.college.trim()) newErrors.college = 'College name is required';
        if (!formData.year) newErrors.year = 'Year of study is required';
        if (!formData.purpose) newErrors.purpose = 'Purpose is required';
        if (!formData.hours) newErrors.hours = 'Training hours are required';
        if (!formData.previousInternship) newErrors.previousInternship = 'This field is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setIsSubmitting(false);
            setIsSubmitted(true);
            
            // Reset form after success
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    age: '',
                    college: '',
                    year: '',
                    purpose: '',
                    hours: '',
                    previousInternship: ''
                });
                setIsSubmitted(false);
            }, 3000);
        } else {
            setErrors(formErrors);
            
            // Animate error fields
            Object.keys(formErrors).forEach(field => {
                const element = document.getElementById(field);
                if (element) {
                    element.classList.add('error-shake');
                    setTimeout(() => {
                        element.classList.remove('error-shake');
                    }, 500);
                }
            });
        }
    };

    const yearOptions = [
        '1st Year',
        '2nd Year', 
        '3rd Year',
        '4th Year',
        'Graduate',
        'Post Graduate'
    ];

    const purposeOptions = [
        'Voluntary learning',
        'Academic requirement',
        'Career development',
        'Skill enhancement',
        'Other'
    ];

    const hoursOptions = [
        'Less than 100 hours',
        '100-200 hours',
        '200-300 hours',
        '300-400 hours',
        'More than 400 hours'
    ];

    if (isSubmitted) {
        return (
            <div className="enquiry-form-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="success-animation">
                                <div className="success-checkmark">
                                    <div className="check-icon">
                                        <span className="icon-line line-tip"></span>
                                        <span className="icon-line line-long"></span>
                                        <div className="icon-circle"></div>
                                        <div className="icon-fix"></div>
                                    </div>
                                </div>
                                <h2 className="success-title">Application Submitted!</h2>
                                <p className="success-message">
                                    Thank you for your interest in our internship program. 
                                    We'll get back to you within 24 hours.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="enquiry-form-page">
            {/* Animated Background */}
            <div className="form-background">
                <div className="floating-element el-1"></div>
                <div className="floating-element el-2"></div>
                <div className="floating-element el-3"></div>
                <div className="floating-element el-4"></div>
            </div>

            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        {/* Form Header */}
                        <div className="form-header text-center animate-header">
                            <h1 className="form-title">Enquire Now</h1>
                            <p className="form-subtitle">
                                Start your journey towards becoming a professional psychologist. 
                                Fill out the form below and we'll contact you shortly.
                            </p>
                            <div className="header-divider"></div>
                        </div>

                        {/* Enquiry Form */}
                        <div className="enquiry-form-container animate-form">
                            <Form onSubmit={handleSubmit} className="enquiry-form">
                                {/* Name Field */}
                                <div className="form-field-group">
                                    <label htmlFor="name" className="form-label">
                                        Your Name *
                                    </label>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            placeholder="Enter your full name"
                                        />
                                        <span className="input-icon">👤</span>
                                    </div>
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                {/* Email Field */}
                                <div className="form-field-group">
                                    <label htmlFor="email" className="form-label">
                                        Your Email *
                                    </label>
                                    <div className="input-container">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="Enter your email address"
                                        />
                                        <span className="input-icon">📧</span>
                                    </div>
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                {/* Age Field */}
                                <div className="form-field-group">
                                    <label htmlFor="age" className="form-label">
                                        Your Age *
                                    </label>
                                    <div className="input-container">
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className={`form-input ${errors.age ? 'error' : ''}`}
                                            placeholder="Enter your age"
                                            min="18"
                                            max="60"
                                        />
                                        <span className="input-icon">🎂</span>
                                    </div>
                                    {errors.age && <span className="error-message">{errors.age}</span>}
                                </div>

                                {/* College Field */}
                                <div className="form-field-group">
                                    <label htmlFor="college" className="form-label">
                                        College Name *
                                    </label>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            id="college"
                                            name="college"
                                            value={formData.college}
                                            onChange={handleChange}
                                            className={`form-input ${errors.college ? 'error' : ''}`}
                                            placeholder="Enter your college/university name"
                                        />
                                        <span className="input-icon">🎓</span>
                                    </div>
                                    {errors.college && <span className="error-message">{errors.college}</span>}
                                </div>

                                {/* Year of Study */}
                                <div className="form-field-group">
                                    <label htmlFor="year" className="form-label">
                                        Year In Which You Are Studying *
                                    </label>
                                    <div className="input-container">
                                        <select
                                            id="year"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className={`form-select ${errors.year ? 'error' : ''}`}
                                        >
                                            <option value="">Select your year</option>
                                            {yearOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="input-icon">📅</span>
                                    </div>
                                    {errors.year && <span className="error-message">{errors.year}</span>}
                                </div>

                                {/* Purpose */}
                                <div className="form-field-group">
                                    <label htmlFor="purpose" className="form-label">
                                        Purpose Of This Internship *
                                    </label>
                                    <div className="input-container">
                                        <select
                                            id="purpose"
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className={`form-select ${errors.purpose ? 'error' : ''}`}
                                        >
                                            <option value="">Select purpose</option>
                                            {purposeOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="input-icon">🎯</span>
                                    </div>
                                    {errors.purpose && <span className="error-message">{errors.purpose}</span>}
                                </div>

                                {/* Hours Required */}
                                <div className="form-field-group">
                                    <label htmlFor="hours" className="form-label">
                                        Hours of training required *
                                    </label>
                                    <div className="input-container">
                                        <select
                                            id="hours"
                                            name="hours"
                                            value={formData.hours}
                                            onChange={handleChange}
                                            className={`form-select ${errors.hours ? 'error' : ''}`}
                                        >
                                            <option value="">Select hours</option>
                                            {hoursOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="input-icon">⏰</span>
                                    </div>
                                    {errors.hours && <span className="error-message">{errors.hours}</span>}
                                </div>

                                {/* Previous Internship */}
                                <div className="form-field-group">
                                    <label className="form-label">
                                        Whether you have done any internship before? *
                                    </label>
                                    <div className="radio-group">
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="previousInternship"
                                                value="Yes"
                                                checked={formData.previousInternship === 'Yes'}
                                                onChange={handleChange}
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">Yes</span>
                                        </label>
                                        <label className="radio-option">
                                            <input
                                                type="radio"
                                                name="previousInternship"
                                                value="No"
                                                checked={formData.previousInternship === 'No'}
                                                onChange={handleChange}
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">No</span>
                                        </label>
                                    </div>
                                    {errors.previousInternship && (
                                        <span className="error-message">{errors.previousInternship}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`submit-btns ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .enquiry-form-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .form-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-element {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    opacity: 0.1;
                    animation: float 8s ease-in-out infinite;
                }

                .el-1 {
                    width: 120px;
                    height: 120px;
                    top: 10%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .el-2 {
                    width: 80px;
                    height: 80px;
                    top: 60%;
                    right: 10%;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    animation-delay: 2s;
                }

                .el-3 {
                    width: 100px;
                    height: 100px;
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .el-4 {
                    width: 60px;
                    height: 60px;
                    top: 30%;
                    right: 20%;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    animation-delay: 1s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    33% {
                        transform: translateY(-20px) rotate(120deg) scale(1.1);
                    }
                    66% {
                        transform: translateY(10px) rotate(240deg) scale(0.9);
                    }
                }

                /* Header Animations */
                .animate-header {
                    opacity: 0;
                    animation: slideDown 1s ease-out 0.3s forwards;
                }

                .animate-form {
                    opacity: 0;
                    animation: fadeInUp 1s ease-out 0.6s forwards;
                }

                .form-header {
                    margin-bottom: 3rem;
                }

                .form-title {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #2a5298;
                    margin-bottom: 1rem;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .form-subtitle {
                    font-size: 1.2rem;
                    color: #6c757d;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .header-divider {
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 1s forwards;
                    transform-origin: left;
                }

                /* Form Container */
                .enquiry-form-container {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 1;
                    border: 1px solid rgba(255, 107, 53, 0.1);
                }

                .enquiry-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                /* Form Fields */
                .form-field-group {
                    position: relative;
                }

                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #2a5298;
                    font-size: 1rem;
                }

                .input-container {
                    position: relative;
                }

                .form-input, .form-select {
                    width: 100%;
                    padding: 15px 50px 15px 20px;
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                    color: #495057;
                }

                .form-input:focus, .form-select:focus {
                    outline: none;
                    border-color: #2a5298;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
                    transform: translateY(-2px);
                }

                .form-input.error, .form-select.error {
                    border-color: #dc3545;
                    animation: shake 0.5s ease-in-out;
                }

                .input-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }

                .form-input:focus + .input-icon,
                .form-select:focus + .input-icon {
                    transform: translateY(-50%) scale(1.2);
                }

                /* Radio Buttons */
                .radio-group {
                    display: flex;
                    gap: 2rem;
                    margin-top: 0.5rem;
                }

                .radio-option {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    padding: 10px 15px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .radio-option:hover {
                    background: #f8f9fa;
                }

                .radio-input {
                    display: none;
                }

                .radio-custom {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #e9ecef;
                    border-radius: 50%;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .radio-input:checked + .radio-custom {
                    border-color: #2a5298;
                    background: #2a5298;
                }

                .radio-input:checked + .radio-custom::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                }

                .radio-label {
                    font-weight: 500;
                    color: #495057;
                }

                /* Submit Button */
                .submit-btns {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 18px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                    position: relative;
                    overflow: hidden;
                    margin-top: 1rem;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
                }

                .submit-btns:active {
                    transform: translateY(-1px);
                }

                .submit-btns.submitting {
                    background: linear-gradient(45deg, #6c757d, #adb5bd);
                    cursor: not-allowed;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                    margin-right: 10px;
                }

                /* Error Messages */
                .error-message {
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                    display: block;
                    animation: fadeIn 0.3s ease;
                }

                /* Success Animation */
                .success-animation {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .success-checkmark {
                    margin: 0 auto 2rem;
                }

                .check-icon {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    border-radius: 50%;
                    box-sizing: content-box;
                    border: 4px solid #4CAF50;
                    margin: 0 auto;
                }

                .check-icon::before {
                    top: 3px;
                    left: -2px;
                    width: 30px;
                    transform-origin: 100% 50%;
                    border-radius: 100px 0 0 100px;
                }

                .check-icon::after {
                    top: 0;
                    left: 30px;
                    width: 60px;
                    transform-origin: 0 50%;
                    border-radius: 0 100px 100px 0;
                    animation: rotate-circle 4.25s ease-in;
                }

                .check-icon::before, .check-icon::after {
                    content: '';
                    height: 100px;
                    position: absolute;
                    background: #FFFFFF;
                    transform: rotate(-45deg);
                }

                .icon-line {
                    height: 5px;
                    background-color: #4CAF50;
                    display: block;
                    border-radius: 2px;
                    position: absolute;
                    z-index: 10;
                }

                .line-tip {
                    top: 46px;
                    left: 14px;
                    width: 25px;
                    transform: rotate(45deg);
                    animation: icon-line-tip 0.75s;
                }

                .line-long {
                    top: 38px;
                    right: 8px;
                    width: 47px;
                    transform: rotate(-45deg);
                    animation: icon-line-long 0.75s;
                }

                .icon-circle {
                    top: -4px;
                    left: -4px;
                    z-index: 10;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    position: absolute;
                    box-sizing: content-box;
                    border: 4px solid rgba(76, 175, 80, .5);
                }

                .icon-fix {
                    top: 8px;
                    width: 5px;
                    left: 26px;
                    z-index: 1;
                    height: 85px;
                    position: absolute;
                    transform: rotate(-45deg);
                    background-color: #FFFFFF;
                }

                .success-title {
                    color: #2a5298;
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .success-message {
                    color: #6c757d;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                /* Animations */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 80px; }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes icon-line-tip {
                    0% { width: 0; left: 1px; top: 19px; }
                    54% { width: 0; left: 1px; top: 19px; }
                    70% { width: 50px; left: -8px; top: 37px; }
                    84% { width: 17px; left: 21px; top: 48px; }
                    100% { width: 25px; left: 14px; top: 45px; }
                }

                @keyframes icon-line-long {
                    0% { width: 0; right: 46px; top: 54px; }
                    65% { width: 0; right: 46px; top: 54px; }
                    84% { width: 55px; right: 0px; top: 35px; }
                    100% { width: 47px; right: 8px; top: 38px; }
                }

                @keyframes rotate-circle {
                    0% { transform: rotate(-45deg); }
                    5% { transform: rotate(-45deg); }
                    12% { transform: rotate(-405deg); }
                    100% { transform: rotate(-405deg); }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .form-title {
                        font-size: 2.5rem;
                    }

                    .enquiry-form-container {
                        padding: 2rem;
                    }

                    .radio-group {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .submit-btns {
                        padding: 15px 25px;
                        font-size: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    .form-title {
                        font-size: 2rem;
                    }

                    .enquiry-form-container {
                        padding: 1.5rem;
                    }

                    .form-input, .form-select {
                        padding: 12px 45px 12px 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default EnquiryForm;