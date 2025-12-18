// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaFlask, FaHeartbeat, FaBrain, FaDna, FaXRay, FaVial, FaStethoscope } from 'react-icons/fa';
// import { GiLungs, GiKidneys } from 'react-icons/gi';

// const Tests = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [medicalTests, setMedicalTests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [categories, setCategories] = useState(['All']);

//     // Fetch subservices from API
//     useEffect(() => {
//         const fetchSubservices = async () => {
//             try {
//                 setLoading(true);
//                 const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//                 const response = await fetch(`${VITE_BACKEND_URL}/subservice/list`);
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
                
//                 const data = await response.json();
                
//                 if (data.status) {
//                     // Transform API data to match the expected format
//                     const transformedTests = data.data.map((subservice, index) => ({
//                         id: subservice.id || index + 1,
//                         name: subservice.title || 'Test Name Not Available',
//                         description: subservice.description || 'Description not available',
//                         category: getCategoryFromServiceId(subservice.service_id) || 'General',
//                         originalData: subservice // Keep original data if needed
//                     }));
                    
//                     setMedicalTests(transformedTests);
                    
//                     // Extract unique categories from transformed tests
//                     const uniqueCategories = ['All', ...new Set(transformedTests.map(test => test.category).filter(Boolean))];
//                     setCategories(uniqueCategories);
//                 } else {
//                     throw new Error(data.message || 'Failed to fetch subservices');
//                 }
//             } catch (err) {
//                 console.error('Error fetching subservices:', err);
//                 setError(err.message);
                
//                 // Fallback to sample data if API fails
//                 const fallbackData = getSampleMedicalTests();
//                 setMedicalTests(fallbackData);
                
//                 const fallbackCategories = ['All', ...new Set(fallbackData.map(test => test.category))];
//                 setCategories(fallbackCategories);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSubservices();
//     }, []);

//     // Helper function to map service_id to category names
//     const getCategoryFromServiceId = (serviceId) => {
//         const categoryMap = {
//             '1': 'Cardiology',
//             '2': 'Neurology',
//             '3': 'Pulmonology',
//             '4': 'Hematology',
//             '5': 'Endocrinology',
//             '6': 'Radiology',
//             '7': 'Genetics',
//             '8': 'Nephrology',
//             '9': 'Immunology',
//             '10': 'Urology',
//             '11': 'Gynecology',
//             '12': 'Nutrition',
//             '13': 'Hepatology'
//         };
        
//         return categoryMap[serviceId] || 'General';
//     };

//     // Fallback sample data in case API fails
//     const getSampleMedicalTests = () => [
//         {
//             id: 1,
//             name: 'Complete Blood Count',
//             description: 'Measures different components of blood including red cells, white cells, and platelets to detect anemia, infection, and many other disorders.',
//             category: 'Hematology'
//         },
//         {
//             id: 2,
//             name: 'Lipid Profile',
//             description: 'Measures cholesterol levels including LDL, HDL, and triglycerides to assess heart disease risk and monitor treatment effectiveness.',
//             category: 'Cardiology'
//         },
//         {
//             id: 3,
//             name: 'Liver Function Test',
//             description: 'Group of blood tests that check for inflammation, damage, or disease of the liver by measuring enzymes, proteins, and substances.',
//             category: 'Hepatology'
//         },
//         // ... add more sample data as needed
//     ];

//     const getCategoryIcon = (category) => {
//         const icons = {
//             'Hematology': <FaVial className="text-red-500" />,
//             'Cardiology': <FaHeartbeat className="text-red-400" />,
//             'Radiology': <FaXRay className="text-blue-800" />,
//             'Neurology': <FaBrain className="text-purple-500" />,
//             'Genetics': <FaDna className="text-green-500" />,
//             'Pulmonology': <GiLungs className="text-teal-500" />,
//             'Nephrology': <GiKidneys className="text-orange-500" />,
//             'Endocrinology': <FaFlask className="text-pink-500" />,
//             'Immunology': <FaVial className="text-yellow-500" />,
//             'Urology': <GiKidneys className="text-blue-500" />,
//             'Gynecology': <FaHeartbeat className="text-pink-400" />,
//             'Nutrition': <FaFlask className="text-green-400" />,
//             'Hepatology': <FaFlask className="text-yellow-600" />,
//             'General': <FaFlask className="text-gray-500" />
//         };
//         return icons[category] || icons.General;
//     };

//     const filteredTests = medicalTests.filter(test => {
//         const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             test.description.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
//         return matchesSearch && matchesCategory;
//     });

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading medical tests...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error && medicalTests.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center py-16">
//                         <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
//                             <FaFlask className="h-16 w-16 text-red-500" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             Error Loading Data
//                         </h3>
//                         <p className="text-gray-500 max-w-md mx-auto mb-4">
//                             {error}
//                         </p>
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <div className="flex justify-center mb-4">
//                         <div className="bg-white p-4 rounded-2xl shadow-lg">
//                             <FaStethoscope className="h-12 w-12 text-blue-600" />
//                         </div>
//                     </div>
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//                         Medical Tests & Diagnostics
//                     </h1>
//                     <p className="text-gray-600 max-w-3xl mx-auto">
//                         Comprehensive range of diagnostic tests and medical screenings to help assess your health and detect potential issues early
//                     </p>
//                     {error && (
//                         <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-lg mx-auto">
//                             <p className="text-yellow-700 text-sm">
//                                 <span className="font-semibold">Note:</span> Using fallback data. {error}
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Search and Filter Section */}
//                 <div className="mb-10">
//                     {/* Search Bar */}
//                     <div className="relative max-w-xl mx-auto mb-6">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FaSearch className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Search medical tests..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm"
//                         />
//                     </div>

//                     {/* Category Filters */}
//                     <div className="overflow-x-auto pb-2">
//                         <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max">
//                             {categories.map((category) => (
//                                 <button
//                                     key={category}
//                                     onClick={() => setSelectedCategory(category)}
//                                     className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
//                                             ? 'bg-blue-600 text-white shadow-md'
//                                             : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
//                                         }`}
//                                 >
//                                     {getCategoryIcon(category)}
//                                     <span>{category}</span>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tests Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredTests.map((test) => (
//                         <div
//                             key={test.id}
//                             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
//                         >
//                             {/* Category Badge */}
//                             <div className="px-6 pt-6 pb-2">
//                                 <div className="flex items-center gap-2 mb-3">
//                                     <div className="text-lg">
//                                         {getCategoryIcon(test.category)}
//                                     </div>
//                                     <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
//                                         {test.category}
//                                     </span>
//                                 </div>

//                                 {/* Test Name */}
//                                 <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
//                                     {test.name}
//                                 </h3>

//                                 {/* Test Description */}
//                                 <div className="mb-6">
//                                     <p className="text-gray-600 leading-relaxed">
//                                         {test.description}
//                                     </p>
//                                 </div>

//                                 {/* Additional Info from API if available */}
//                                 {test.originalData && (
//                                     <div className="mt-4 pt-4 border-t border-gray-100">
//                                         <div className="flex flex-wrap gap-4 text-sm text-gray-500">
//                                             {test.originalData.price && (
//                                                 <div className="flex items-center gap-1">
//                                                     <span className="font-medium">Price:</span>
//                                                     <span className="font-semibold text-green-600">
//                                                         ${test.originalData.price}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                             {test.originalData.duration && (
//                                                 <div className="flex items-center gap-1">
//                                                     <span className="font-medium">Duration:</span>
//                                                     <span>{test.originalData.duration}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredTests.length === 0 && (
//                     <div className="text-center py-16">
//                         <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
//                             <FaFlask className="h-16 w-16 text-gray-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             No tests found
//                         </h3>
//                         <p className="text-gray-500 max-w-md mx-auto">
//                             Try adjusting your search or select a different category to find the test you're looking for
//                         </p>
//                     </div>
//                 )}

//                 {/* Information Section */}
//                 <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//                     <div className="max-w-4xl mx-auto">
//                         <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                             Understanding Medical Tests
//                         </h3>
//                         <div className="grid md:grid-cols-2 gap-8">
//                             <div className="space-y-4">
//                                 <div className="flex items-start gap-3">
//                                     <div className="bg-blue-100 p-2 rounded-lg">
//                                         <FaFlask className="h-5 w-5 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold text-gray-800 mb-1">Why Get Tested?</h4>
//                                         <p className="text-gray-600 text-sm">
//                                             Medical tests help detect diseases early, monitor ongoing conditions, assess treatment effectiveness, and provide peace of mind about your health status.
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-3">
//                                     <div className="bg-teal-100 p-2 rounded-lg">
//                                         <FaHeartbeat className="h-5 w-5 text-teal-600" />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold text-gray-800 mb-1">Test Preparation</h4>
//                                         <p className="text-gray-600 text-sm">
//                                             Most tests require specific preparation like fasting or medication adjustments. Always follow your healthcare provider's instructions for accurate results.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="space-y-4">
//                                 <div className="flex items-start gap-3">
//                                     <div className="bg-purple-100 p-2 rounded-lg">
//                                         <FaBrain className="h-5 w-5 text-purple-600" />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold text-gray-800 mb-1">Understanding Results</h4>
//                                         <p className="text-gray-600 text-sm">
//                                             Test results should always be interpreted by qualified healthcare professionals who consider your complete medical history and symptoms.
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-3">
//                                     <div className="bg-orange-100 p-2 rounded-lg">
//                                         <FaDna className="h-5 w-5 text-orange-600" />
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold text-gray-800 mb-1">Frequency & Timing</h4>
//                                         <p className="text-gray-600 text-sm">
//                                             The frequency of tests depends on your age, health status, family history, and specific risk factors. Regular screenings are key to preventive healthcare.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tests;

import React, { useState, useEffect } from 'react';
import { FaSearch, FaFlask, FaHeartbeat, FaBrain, FaDna, FaXRay, FaVial, FaStethoscope } from 'react-icons/fa';
import { GiLungs, GiKidneys } from 'react-icons/gi';

const Tests = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [medicalTests, setMedicalTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(['All']);

    // Fetch subservices from API
    useEffect(() => {
        const fetchSubservices = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Use optional chaining for environment variable
                const VITE_BACKEND_URL = import.meta.env?.VITE_BACKEND_URL;
                
                if (!VITE_BACKEND_URL) {
                    throw new Error('Backend URL is not configured. Please check your environment variables.');
                }
                
                console.log('Fetching from:', `${VITE_BACKEND_URL}/subservice/list`);
                
                const response = await fetch(`${VITE_BACKEND_URL}/subservice/list`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                // Log the response
                console.log('Response status:', response?.status);
                
                let data;
                try {
                    data = await response?.json();
                } catch (parseError) {
                    console.error('Failed to parse JSON:', parseError);
                    throw new Error('Invalid JSON response from server');
                }
                
                // Use optional chaining for all data access
                if (!data?.status) {
                    throw new Error(data?.message || 'API returned non-success status');
                }
                
                // Check if data.data exists and is an array using optional chaining
                const apiData = data?.data;
                
                if (!Array.isArray(apiData)) {
                    console.warn('API response does not contain valid data array:', data);
                    throw new Error('Invalid data format from API: data.data is not an array');
                }
                
                if (apiData?.length === 0) {
                    console.log('API returned empty array');
                    setMedicalTests([]);
                    setCategories(['All']);
                    setLoading(false);
                    return;
                }
                
                // Transform API data to match the expected format using optional chaining
                const transformedTests = apiData?.map((subservice, index) => {
                    // Use optional chaining for all properties
                    const id = subservice?.id || index + 1;
                    const title = subservice?.title || subservice?.name || 'Test Name Not Available';
                    const description = subservice?.description || 'Description not available';
                    const serviceId = subservice?.service_id;
                    const price = subservice?.price;
                    const duration = subservice?.duration;
                    
                    return {
                        id,
                        name: title,
                        description,
                        category: getCategoryFromServiceId(serviceId) || 'General',
                        price,
                        duration,
                        originalData: subservice
                    };
                }) || [];
                
                console.log('Transformed tests:', transformedTests);
                
                setMedicalTests(transformedTests);
                
                // Extract unique categories using optional chaining
                const categorySet = new Set(['All']);
                transformedTests?.forEach(test => {
                    if (test?.category) {
                        categorySet.add(test.category);
                    }
                });
                
                const uniqueCategories = Array.from(categorySet);
                console.log('Unique categories:', uniqueCategories);
                setCategories(uniqueCategories);
                
            } catch (err) {
                console.error('Error fetching subservices:', err);
                setError(err?.message || 'Unknown error occurred');
                
                // Set empty arrays instead of fallback data
                setMedicalTests([]);
                setCategories(['All']);
            } finally {
                setLoading(false);
            }
        };

        fetchSubservices();
    }, []);

    // Helper function to map service_id to category names
    const getCategoryFromServiceId = (serviceId) => {
        const categoryMap = {
            '1': 'Cardiology',
            '2': 'Neurology',
            '3': 'Pulmonology',
            '4': 'Hematology',
            '5': 'Endocrinology',
            '6': 'Radiology',
            '7': 'Genetics',
            '8': 'Nephrology',
            '9': 'Immunology',
            '10': 'Urology',
            '11': 'Gynecology',
            '12': 'Nutrition',
            '13': 'Hepatology'
        };
        
        return serviceId ? categoryMap[String(serviceId)] : 'General';
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Hematology': <FaVial className="text-red-500" />,
            'Cardiology': <FaHeartbeat className="text-red-400" />,
            'Radiology': <FaXRay className="text-blue-800" />,
            'Neurology': <FaBrain className="text-purple-500" />,
            'Genetics': <FaDna className="text-green-500" />,
            'Pulmonology': <GiLungs className="text-teal-500" />,
            'Nephrology': <GiKidneys className="text-orange-500" />,
            'Endocrinology': <FaFlask className="text-pink-500" />,
            'Immunology': <FaVial className="text-yellow-500" />,
            'Urology': <GiKidneys className="text-blue-500" />,
            'Gynecology': <FaHeartbeat className="text-pink-400" />,
            'Nutrition': <FaFlask className="text-green-400" />,
            'Hepatology': <FaFlask className="text-yellow-600" />,
            'General': <FaFlask className="text-gray-500" />
        };
        return icons[category] || icons.General;
    };

    const filteredTests = medicalTests?.filter(test => {
        if (!test) return false;
        
        const name = test?.name?.toLowerCase() || '';
        const description = test?.description?.toLowerCase() || '';
        const category = test?.category || '';
        
        const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    }) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading medical tests...</p>
                    <p className="text-gray-400 text-sm mt-2">Fetching data from API...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-2xl shadow-lg">
                            <FaStethoscope className="h-12 w-12 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Medical Tests & Diagnostics
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Comprehensive range of diagnostic tests and medical screenings to help assess your health and detect potential issues early
                    </p>
                    
                    {/* Status Messages */}
                    {error ? (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Error Loading Data
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                        <div className="mt-3">
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                            >
                                                Retry Loading
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : medicalTests?.length > 0 ? (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg max-w-lg mx-auto">
                            <p className="text-green-700 text-sm">
                                <span className="font-semibold">✓</span> Loaded {medicalTests.length} tests from API
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-lg mx-auto">
                            <p className="text-yellow-700 text-sm">
                                <span className="font-semibold">ℹ</span> No test data available from API
                            </p>
                        </div>
                    )}
                </div>

                {/* Search and Filter Section */}
                {medicalTests?.length > 0 && (
                    <div className="mb-10">
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search medical tests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="overflow-x-auto pb-2">
                            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max">
                                {categories?.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                            }`}
                                    >
                                        {getCategoryIcon(category)}
                                        <span>{category}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tests Grid */}
                {medicalTests?.length > 0 ? (
                    <>
                        {filteredTests?.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTests.map((test) => (
                                        <div
                                            key={test?.id}
                                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
                                        >
                                            <div className="px-6 pt-6 pb-2">
                                                {/* Category Badge */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="text-lg">
                                                        {getCategoryIcon(test?.category)}
                                                    </div>
                                                    <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                                                        {test?.category || 'General'}
                                                    </span>
                                                </div>

                                                {/* Test Name */}
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                                    {test?.name || 'Unnamed Test'}
                                                </h3>

                                                {/* Test Description */}
                                                <div className="mb-6">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {test?.description || 'No description available.'}
                                                    </p>
                                                </div>

                                                {/* Additional Info */}
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                        {test?.price !== undefined && test?.price !== null && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="font-medium">Price:</span>
                                                                <span className="font-semibold text-green-600">
                                                                    ${test.price}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {test?.duration && (
                                                            <div className="flex items-center gap-1">
                                                                <span className="font-medium">Duration:</span>
                                                                <span>{test.duration}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                        <p className="text-xs text-gray-400">
                                                            ID: {test?.originalData?.id || test?.id || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Results Count */}
                                <div className="mt-6 text-center text-gray-600">
                                    Showing {filteredTests.length} of {medicalTests.length} tests
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
                                    <FaSearch className="h-16 w-16 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No matching tests found
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Try adjusting your search or select a different category
                                </p>
                            </div>
                        )}
                    </>
                ) : !error && (
                    <div className="text-center py-16">
                        <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
                            <FaFlask className="h-16 w-16 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No tests available
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-4">
                            The API did not return any test data.
                        </p>
                    </div>
                )}

                {/* Information Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Understanding Medical Tests
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <FaFlask className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Why Get Tested?</h4>
                                        <p className="text-gray-600 text-sm">
                                            Medical tests help detect diseases early, monitor ongoing conditions, assess treatment effectiveness, and provide peace of mind about your health status.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-teal-100 p-2 rounded-lg">
                                        <FaHeartbeat className="h-5 w-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Test Preparation</h4>
                                        <p className="text-gray-600 text-sm">
                                            Most tests require specific preparation like fasting or medication adjustments. Always follow your healthcare provider's instructions for accurate results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <FaBrain className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Understanding Results</h4>
                                        <p className="text-gray-600 text-sm">
                                            Test results should always be interpreted by qualified healthcare professionals who consider your complete medical history and symptoms.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <FaDna className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Frequency & Timing</h4>
                                        <p className="text-gray-600 text-sm">
                                            The frequency of tests depends on your age, health status, family history, and specific risk factors. Regular screenings are key to preventive healthcare.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tests;