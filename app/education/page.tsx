'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaAward, FaCertificate } from 'react-icons/fa';

interface SemesterGPA {
  semester: string;
  gpa: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  cgpa?: string;
  score?: string;
  semesterGPA?: SemesterGPA[];
  color: string;
}

const Education: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  const education: EducationItem[] = [
    {
      institution: "Sri Sairam Engineering College",
      degree: "B.Tech Computer Science and Business Systems",
      duration: "2022 - 2026",
      cgpa: "8.83 (Current)",
      semesterGPA: [
        { semester: "SEMESTER 1", gpa: "8.468" },
        { semester: "SEMESTER 2", gpa: "8.814" },
        { semester: "SEMESTER 3", gpa: "8.980" },
        { semester: "SEMESTER 4", gpa: "9.191" },
        { semester: "SEMESTER 5", gpa: "8.667" },
        { semester: "SEMESTER 6", gpa: "9.000"}
      ],
      color: "from-blue-500 to-purple-500"
    },
    {
      institution: "St. Sebastian Matriculation Higher Secondary School",
      degree: "Higher Secondary (XII)",
      duration: "2021 - 2022",
      score: "550/600",
      color: "from-yellow-500 to-orange-500"
    },
    {
      institution: "St. Sebastian Matriculation Higher Secondary School",
      degree: "Secondary School (X)",
      duration: "2019 - 2020",
      score: "461/500",
      color: "from-green-500 to-teal-500"
    }
  ];

  const certifications = [
    {
      title: "Zero Solutions",
      description: "Certified UI/UX Designer and Flutter Developer",
      icon: <FaCertificate className="w-6 h-6" />,
      details: "Comprehensive certification covering UI/UX principles and Flutter development practices",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Novi Tech",
      description: "Certified AI/ML Developer",
      icon: <FaAward className="w-6 h-6" />,
      details: "Advanced certification in artificial intelligence and machine learning technologies",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "English Typing",
      description: "Senior English Typist Certification",
      icon: <FaCertificate className="w-6 h-6" />,
      details: "Professional certification in English typing with high accuracy and speed",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Hindi Language",
      description: "Completed Hindi Certification",
      icon: <FaAward className="w-6 h-6" />,
      details: "Comprehensive certification in Hindi language proficiency",
      color: "from-red-500 to-pink-500"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-20 px-4 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center flex items-center justify-center gap-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaGraduationCap className="text-yellow-500 w-10 h-10" />
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
              Education
            </span>
          </motion.h1>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-gray-800 rounded-xl p-6 relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-t-4 border-${edu.color.split(' ')[1].split('-')[1]}-500`}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Timeline dot with animation */}
                <motion.div 
                  className={`absolute -left-3 top-8 w-6 h-6 rounded-full border-4 border-gray-900 bg-gradient-to-r ${edu.color}`}
                  animate={{
                    scale: hoveredCard === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 transition-colors duration-300">
                    {edu.institution}
                  </h2>
                  <h3 className={`text-xl bg-clip-text text-transparent bg-gradient-to-r ${edu.color} mb-2`}>
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400 mb-2">
                    {edu.duration}
                  </p>
                  {'cgpa' in edu ? (
                    <>
                      <motion.p 
                        className="text-green-400 mb-4 font-bold"
                        animate={{ scale: hoveredCard === index ? 1.05 : 1 }}
                      >
                        CGPA: {edu.cgpa}
                      </motion.p>
                      <AnimatePresence>
                        {hoveredCard === index && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <h4 className="text-lg font-semibold mb-2">Semester-wise GPA:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {edu.semesterGPA && edu.semesterGPA.map((sem, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className={`bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 border-l-4 border-${edu.color.split(' ')[1].split('-')[1]}-500`}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-300">{sem.semester}</span>
                                    <span className="text-green-400 font-semibold">{sem.gpa}</span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.p 
                      className="text-green-400 mb-4 font-bold"
                      animate={{ scale: hoveredCard === index ? 1.05 : 1 }}
                    >
                      Score: {edu.score}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-yellow-500"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaAward className="text-yellow-500 w-8 h-8" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                Additional Certifications
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-700 p-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] border-l-4 border-${cert.color.split(' ')[1].split('-')[1]}-500`}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  onClick={() => setExpandedCert(expandedCert === index ? null : index)}
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className={`bg-gradient-to-r ${cert.color} p-2 rounded-lg`}
                      animate={{
                        scale: expandedCert === index ? 1.2 : 1,
                        rotate: expandedCert === index ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {cert.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">{cert.title}</h3>
                      <p className="text-gray-300">{cert.description}</p>
                      <AnimatePresence>
                        {expandedCert === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-400 mt-2 text-sm"
                          >
                            {cert.details}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Education; 
