// import React, { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';

// const Therapys = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     const therapyData = [
//         {
//             id: 1,
//             name: 'Cognitive Behavioral Therapy',
//             description: 'A structured, goal-oriented therapy focusing on identifying and changing negative thought patterns and behaviors.',
//             category: 'CBT'
//         },
//         {
//             id: 2,
//             name: 'Mindfulness Meditation',
//             description: 'Learn mindfulness techniques to reduce stress, anxiety, and increase present-moment awareness.',
//             category: 'Mindfulness'
//         },
//         {
//             id: 3,
//             name: 'Acceptance and Commitment Therapy',
//             description: 'Helps you accept difficult thoughts and feelings while committing to value-based actions.',
//             category: 'ACT'
//         },
//         {
//             id: 4,
//             name: 'Dialectical Behavior Therapy',
//             description: 'Focuses on teaching coping skills to manage emotions, reduce stress, and improve relationships.',
//             category: 'DBT'
//         },
//         {
//             id: 5,
//             name: 'Psychodynamic Therapy',
//             description: 'Explores how past experiences and unconscious thoughts influence current behavior and emotions.',
//             category: 'Psychodynamic'
//         },
//         {
//             id: 6,
//             name: 'Humanistic Therapy',
//             description: 'Emphasizes personal growth, self-awareness, and realizing your full potential.',
//             category: 'Humanistic'
//         },
//         {
//             id: 7,
//             name: 'Art Therapy',
//             description: 'Uses creative processes like painting and drawing to express and understand emotions.',
//             category: 'Creative'
//         },
//         {
//             id: 8,
//             name: 'Solution-Focused Brief Therapy',
//             description: 'Goal-oriented therapy that focuses on solutions rather than problems.',
//             category: 'Brief'
//         },
//         {
//             id: 9,
//             name: 'Trauma-Focused Therapy',
//             description: 'Specifically designed to help individuals recover from traumatic experiences.',
//             category: 'Trauma'
//         },
//         {
//             id: 10,
//             name: 'Family Systems Therapy',
//             description: 'Views family as an emotional unit and addresses issues within family relationships.',
//             category: 'Family'
//         }
//     ];

//     const categories = ['All', 'CBT', 'Mindfulness', 'ACT', 'DBT', 'Psychodynamic', 'Humanistic', 'Creative', 'Brief', 'Trauma', 'Family'];

//     const filteredTherapies = therapyData.filter(therapy => {
//         const matchesSearch = therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             therapy.description.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = selectedCategory === 'All' || therapy.category === selectedCategory;
//         return matchesSearch && matchesCategory;
//     });

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4 md:p-6">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-10">
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//                         Therapeutic Approaches
//                     </h1>
//                     <p className="text-gray-600 max-w-2xl mx-auto">
//                         Explore different therapy methods designed to support your mental wellness journey
//                     </p>
//                 </div>

//                 {/* Search and Filter Section */}
//                 <div className="mb-8 space-y-4">
//                     {/* Search Bar */}
//                     <div className="relative max-w-md mx-auto">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FaSearch className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Search therapies..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
//                         />
//                     </div>

//                     {/* Category Filters */}
//                     <div className="flex flex-wrap justify-center gap-2">
//                         {categories.map((category) => (
//                             <button
//                                 key={category}
//                                 onClick={() => setSelectedCategory(category)}
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
//                                         ? 'bg-sky-500 text-white shadow-md'
//                                         : 'bg-white text-gray-700 border border-gray-200 hover:border-sky-300'
//                                     }`}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Therapies Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredTherapies.map((therapy) => (
//                         <div
//                             key={therapy.id}
//                             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
//                         >
//                             {/* Therapy Header */}
//                             <div className="mb-4">
//                                 <div className="flex items-start justify-between">
//                                     <div>
//                                         <span className="inline-block px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50 rounded-full mb-2">
//                                             {therapy.category}
//                                         </span>
//                                         <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                             {therapy.name}
//                                         </h3>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Therapy Description */}
//                             <div className="mb-6">
//                                 <p className="text-gray-600 leading-relaxed">
//                                     {therapy.description}
//                                 </p>
//                             </div>

                            
//                         </div>
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredTherapies.length === 0 && (
//                     <div className="text-center py-12">
//                         <div className="text-gray-400 text-6xl mb-4">🧘‍♀️</div>
//                         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                             No therapies found
//                         </h3>
//                         <p className="text-gray-500">
//                             Try adjusting your search or filter to find what you're looking for
//                         </p>
//                     </div>
//                 )}

                
//             </div>
//         </div>
//     );
// };

// export default Therapys;

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Therapys = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [therapyData, setTherapyData] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch therapies from API
    useEffect(() => {
        const fetchTherapies = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/therapy/list`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status) {
                    // Transform API data to match the expected format
                    const transformedTherapies = data.data.map((therapy, index) => ({
                        id: therapy.id || index + 1,
                        name: therapy.therapy_name || 'Therapy Name Not Available',
                        description: therapy.therapy_description || 'Description not available',
                        category: therapy.type_of_therapy || therapy.category || 'General',
                        fullCategory: therapy.category || 'General',
                        originalData: therapy // Keep original data if needed
                    }));
                    
                    setTherapyData(transformedTherapies);
                    
                    // Extract unique categories from transformed therapies
                    const uniqueCategories = ['All', ...new Set(
                        transformedTherapies
                            .map(therapy => therapy.category)
                            .filter(Boolean)
                            .sort()
                    )];
                    setCategories(uniqueCategories);
                } else {
                    throw new Error(data.message || 'Failed to fetch therapies');
                }
            } catch (err) {
                console.error('Error fetching therapies:', err);
                setError(err.message);
                
                // Fallback to sample data if API fails
                const fallbackData = getSampleTherapyData();
                setTherapyData(fallbackData);
                
                const fallbackCategories = ['All', ...new Set(
                    fallbackData.map(therapy => therapy.category)
                )];
                setCategories(fallbackCategories);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapies();
    }, []);

    // Fallback sample data in case API fails
    const getSampleTherapyData = () => [
        {
            id: 1,
            name: 'Cognitive Behavioral Therapy',
            description: 'A structured, goal-oriented therapy focusing on identifying and changing negative thought patterns and behaviors.',
            category: 'CBT'
        },
        {
            id: 2,
            name: 'Mindfulness Meditation',
            description: 'Learn mindfulness techniques to reduce stress, anxiety, and increase present-moment awareness.',
            category: 'Mindfulness'
        },
        {
            id: 3,
            name: 'Acceptance and Commitment Therapy',
            description: 'Helps you accept difficult thoughts and feelings while committing to value-based actions.',
            category: 'ACT'
        },
        {
            id: 4,
            name: 'Dialectical Behavior Therapy',
            description: 'Focuses on teaching coping skills to manage emotions, reduce stress, and improve relationships.',
            category: 'DBT'
        },
        {
            id: 5,
            name: 'Psychodynamic Therapy',
            description: 'Explores how past experiences and unconscious thoughts influence current behavior and emotions.',
            category: 'Psychodynamic'
        },
        {
            id: 6,
            name: 'Humanistic Therapy',
            description: 'Emphasizes personal growth, self-awareness, and realizing your full potential.',
            category: 'Humanistic'
        },
        {
            id: 7,
            name: 'Art Therapy',
            description: 'Uses creative processes like painting and drawing to express and understand emotions.',
            category: 'Creative'
        },
        {
            id: 8,
            name: 'Solution-Focused Brief Therapy',
            description: 'Goal-oriented therapy that focuses on solutions rather than problems.',
            category: 'Brief'
        },
        {
            id: 9,
            name: 'Trauma-Focused Therapy',
            description: 'Specifically designed to help individuals recover from traumatic experiences.',
            category: 'Trauma'
        },
        {
            id: 10,
            name: 'Family Systems Therapy',
            description: 'Views family as an emotional unit and addresses issues within family relationships.',
            category: 'Family'
        }
    ];

    // Get category color based on therapy type
    const getCategoryColor = (category) => {
        const colors = {
            'CBT': 'bg-blue-100 text-blue-800',
            'Mindfulness': 'bg-emerald-100 text-emerald-800',
            'ACT': 'bg-purple-100 text-purple-800',
            'DBT': 'bg-pink-100 text-pink-800',
            'Psychodynamic': 'bg-amber-100 text-amber-800',
            'Humanistic': 'bg-indigo-100 text-indigo-800',
            'Creative': 'bg-orange-100 text-orange-800',
            'Brief': 'bg-teal-100 text-teal-800',
            'Trauma': 'bg-rose-100 text-rose-800',
            'Family': 'bg-cyan-100 text-cyan-800',
            'Psychotherapy': 'bg-blue-50 text-blue-700',
            'Counseling': 'bg-green-50 text-green-700',
            'default': 'bg-gray-100 text-gray-800'
        };
        return colors[category] || colors.default;
    };

    // Get category icon emoji
    const getCategoryIcon = (category) => {
        const icons = {
            'CBT': '🧠',
            'Mindfulness': '🧘',
            'ACT': '✨',
            'DBT': '⚖️',
            'Psychodynamic': '🔍',
            'Humanistic': '🌟',
            'Creative': '🎨',
            'Brief': '⚡',
            'Trauma': '🛡️',
            'Family': '👨‍👩‍👧‍👦',
            'Psychotherapy': '💬',
            'Counseling': '👂',
            'default': '💭'
        };
        return icons[category] || icons.default;
    };

    const filteredTherapies = therapyData.filter(therapy => {
        const matchesSearch = therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            therapy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (therapy.originalData?.category && 
             therapy.originalData.category.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All' || therapy.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4 md:p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading therapies...</p>
                </div>
            </div>
        );
    }

    if (error && therapyData.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
                            <span className="text-4xl">💬</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Error Loading Therapies
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-4">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Therapeutic Approaches
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore different therapy methods designed to support your mental wellness journey
                    </p>
                    {error && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-lg mx-auto">
                            <p className="text-amber-700 text-sm">
                                <span className="font-semibold">Note:</span> Using fallback data. {error}
                            </p>
                        </div>
                    )}
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search therapies by name, description, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-sky-500 text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-sky-300 hover:bg-sky-50'
                                    }`}
                            >
                                <span className="text-sm">{getCategoryIcon(category)}</span>
                                <span>{category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Therapies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTherapies.map((therapy) => (
                        <div
                            key={therapy.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-sky-200 group"
                        >
                            {/* Therapy Header */}
                            <div className="mb-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">
                                            {getCategoryIcon(therapy.category)}
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(therapy.category)}`}>
                                            {therapy.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors">
                                    {therapy.name}
                                </h3>
                            </div>

                            {/* Therapy Description */}
                            <div className="mb-6">
                                <p className="text-gray-600 leading-relaxed">
                                    {therapy.description}
                                </p>
                            </div>

                            {/* Additional Info from API if available */}
                            {therapy.originalData && therapy.originalData.category && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-500">Main Category:</span>
                                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                            {therapy.originalData.category}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* View Details Button */}
                            <div className="mt-4">
                                <button className="w-full py-2 text-sm font-medium text-sky-600 hover:text-sky-700 border border-sky-200 hover:border-sky-300 rounded-lg transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTherapies.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🧘‍♀️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No therapies found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filter to find what you're looking for
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                            }}
                            className="px-4 py-2 text-sm text-sky-600 hover:text-sky-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Stats Summary */}
                <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Therapeutic Options Summary
                        </h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-sky-600">
                                    {therapyData.length}
                                </div>
                                <div className="text-sm text-gray-600">Total Therapies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">
                                    {categories.length - 1}
                                </div>
                                <div className="text-sm text-gray-600">Different Approaches</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {filteredTherapies.length}
                                </div>
                                <div className="text-sm text-gray-600">Currently Displayed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Therapys;