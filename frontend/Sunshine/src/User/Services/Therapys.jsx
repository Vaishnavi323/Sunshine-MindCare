import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Therapys = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const therapyData = [
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

    const categories = ['All', 'CBT', 'Mindfulness', 'ACT', 'DBT', 'Psychodynamic', 'Humanistic', 'Creative', 'Brief', 'Trauma', 'Family'];

    const filteredTherapies = therapyData.filter(therapy => {
        const matchesSearch = therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            therapy.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || therapy.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                            placeholder="Search therapies..."
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
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-sky-500 text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-sky-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Therapies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTherapies.map((therapy) => (
                        <div
                            key={therapy.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                        >
                            {/* Therapy Header */}
                            <div className="mb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-50 rounded-full mb-2">
                                            {therapy.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {therapy.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Therapy Description */}
                            <div className="mb-6">
                                <p className="text-gray-600 leading-relaxed">
                                    {therapy.description}
                                </p>
                            </div>

                            {/* Learn More Button */}
                            {/* <button className="w-full py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                                Learn More
                            </button> */}
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
                        <p className="text-gray-500">
                            Try adjusting your search or filter to find what you're looking for
                        </p>
                    </div>
                )}

                {/* Info Section */}
                {/* <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        How to Choose a Therapy
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Each therapeutic approach has unique strengths. Consider what resonates with you,
                        your personal goals, and what feels most comfortable for your journey.
                    </p>
                    <p className="text-gray-600">
                        Remember, the most important factor is finding an approach that feels right for you
                        and a therapist you connect with.
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default Therapys;