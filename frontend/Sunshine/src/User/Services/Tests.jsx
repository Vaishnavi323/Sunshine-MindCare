import React, { useState } from 'react';
import { FaSearch, FaFlask, FaHeartbeat, FaBrain, FaDna, FaXRay, FaVial, FaStethoscope } from 'react-icons/fa';
import { GiLungs, GiKidneys } from 'react-icons/gi';

const Tests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const medicalTests = [
    {
      id: 1,
      name: 'Complete Blood Count',
      description: 'Measures different components of blood including red cells, white cells, and platelets to detect anemia, infection, and many other disorders.',
      category: 'Hematology'
    },
    {
      id: 2,
      name: 'Lipid Profile',
      description: 'Measures cholesterol levels including LDL, HDL, and triglycerides to assess heart disease risk and monitor treatment effectiveness.',
      category: 'Cardiology'
    },
    {
      id: 3,
      name: 'Liver Function Test',
      description: 'Group of blood tests that check for inflammation, damage, or disease of the liver by measuring enzymes, proteins, and substances.',
      category: 'Hepatology'
    },
    {
      id: 4,
      name: 'Thyroid Function Test',
      description: 'Measures thyroid hormones to diagnose thyroid disorders, monitor thyroid treatment, or screen newborns for thyroid problems.',
      category: 'Endocrinology'
    },
    {
      id: 5,
      name: 'MRI Scan',
      description: 'Non-invasive imaging test that uses magnetic fields and radio waves to create detailed pictures of organs and tissues in the body.',
      category: 'Radiology'
    },
    {
      id: 6,
      name: 'CT Scan',
      description: 'Combines X-rays with computer technology to produce detailed cross-sectional images of bones, blood vessels, and soft tissues.',
      category: 'Radiology'
    },
    {
      id: 7,
      name: 'ECG (Electrocardiogram)',
      description: 'Records the electrical activity of the heart to detect heart problems, monitor heart health, or check the effectiveness of heart treatments.',
      category: 'Cardiology'
    },
    {
      id: 8,
      name: 'Genetic Testing',
      description: 'Analyzes DNA to identify changes in genes, chromosomes, or proteins that may indicate genetic disorders or predisposition to diseases.',
      category: 'Genetics'
    },
    {
      id: 9,
      name: 'Pulmonary Function Test',
      description: 'Series of breathing tests that measure how well your lungs take in and release air and how efficiently they transfer oxygen to blood.',
      category: 'Pulmonology'
    },
    {
      id: 10,
      name: 'Kidney Function Test',
      description: 'Measures how well kidneys are working by checking levels of various substances in blood and urine, including creatinine and urea.',
      category: 'Nephrology'
    },
    {
      id: 11,
      name: 'Vitamin D Test',
      description: 'Measures the level of vitamin D in blood to detect deficiency which can lead to bone disorders and other health problems.',
      category: 'Nutrition'
    },
    {
      id: 12,
      name: 'Pap Smear Test',
      description: 'Screens for cervical cancer by collecting cells from cervix to check for abnormalities that might indicate cancer or precancer.',
      category: 'Gynecology'
    },
    {
      id: 13,
      name: 'PSA Test',
      description: 'Measures prostate-specific antigen levels in blood to screen for prostate cancer or monitor treatment in diagnosed patients.',
      category: 'Urology'
    },
    {
      id: 14,
      name: 'Allergy Testing',
      description: 'Identifies specific substances that trigger allergic reactions through skin tests or blood tests measuring IgE antibodies.',
      category: 'Immunology'
    },
    {
      id: 15,
      name: 'EEG (Electroencephalogram)',
      description: 'Records electrical activity of brain to detect problems related to brain function such as seizures, tumors, or sleep disorders.',
      category: 'Neurology'
    }
  ];

  const categories = ['All', 'Hematology', 'Cardiology', 'Radiology', 'Endocrinology', 'Genetics', 'Pulmonology', 'Nephrology', 'Neurology', 'Immunology', 'Urology', 'Gynecology', 'Nutrition', 'Hepatology'];

  const getCategoryIcon = (category) => {
    const icons = {
      'Hematology': <FaVial className="text-red-500" />,
      'Cardiology': <FaHeartbeat className="text-red-400" />,
      'Radiology': <FaXRay className="text-blue-500" />,
      'Neurology': <FaBrain className="text-purple-500" />,
      'Genetics': <FaDna className="text-green-500" />,
      'Pulmonology': <GiLungs className="text-teal-500" />,
      'Nephrology': <GiKidneys className="text-orange-500" />,
      'default': <FaFlask className="text-gray-500" />
    };
    return icons[category] || icons.default;
  };

  const filteredTests = medicalTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        </div>

        {/* Search and Filter Section */}
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="overflow-x-auto pb-2">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
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

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
            >
              {/* Category Badge */}
              <div className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-lg">
                    {getCategoryIcon(test.category)}
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                    {test.category}
                  </span>
                </div>
                
                {/* Test Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {test.name}
                </h3>

                {/* Test Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {test.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg">
                  Book This Test
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-6">
              <FaFlask className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tests found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or select a different category to find the test you're looking for
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