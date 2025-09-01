import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { GraduationCap, MapPin, Calendar, Download, Award } from "lucide-react";
import { mockSkills, mockBio } from "../mock/data";

const About = () => {
  const education = [
    {
      degree: "Bachelor of Engineering",
      field: "Computer Science in Artificial Intelligence & Machine Learning",
      institution: "Graphic Era Deemed to be University",
      location: "Dehradun",
      period: "June 2022 - June 2026",
      status: "In Progress"
    },
    {
      degree: "Class 12th - CBSE",
      field: "Science",
      institution: "Asian Senior Secondary School",
      location: "Shikohabad",
      period: "2021 - 2022",
      status: "90%"
    },
    {
      degree: "Class 10th - CBSE",
      field: "All Subjects",
      institution: "Georgions Academy",
      location: "Shikohabad",
      period: "2012 - 2013",
      status: "CGPA 9.4/10"
    }
  ];

  const experience = [
    {
      role: "Data Science with ML & AI Intern",
      company: "Upflairs Pvt. Ltd.",
      location: "Remote",
      period: "July 2025 - August 2025",
      type: "45 Days Internship",
      highlights: [
        "Gained hands-on experience in core concepts of data science, machine learning, and AI",
        "Worked on real-world datasets for data preprocessing, model building, and evaluation",
        "Implemented algorithms: Linear Regression, Decision Trees, Random Forest, KNN, Neural Networks",
        "Explored tools: NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow"
      ]
    }
  ];

  const certifications = [
    "Oracle Cloud Infrastructure 2025 Certified",
    "Data Science Professional",
    "Introduction to Programming with Python (Google)",
    "AWS Cloud Technical Essentials",
    "AWS Cloud Practitioner Essentials",
    "AWS ML Engineer Associate"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate AI enthusiast transforming ideas into intelligent solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] rounded-lg mr-3"></div>
                My Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {mockBio.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] rounded-lg mr-3"></div>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index} className="border-l-4 border-l-[#00d4aa]">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#00d4aa]">
                            {exp.role}
                          </h3>
                          <p className="text-lg font-medium">{exp.company}</p>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2 lg:mt-0 lg:text-right">
                          <div className="flex items-center lg:justify-end">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                          <div className="flex items-center lg:justify-end mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <Badge variant="secondary" className="mt-2">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-[#45b7d1] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-lg mr-3"></div>
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-full flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <p className="text-[#6c5ce7] font-medium">{edu.field}</p>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {edu.location}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {edu.period}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`${
                                edu.status.includes('Progress') 
                                  ? 'border-[#ffd93d] text-[#ffd93d]' 
                                  : 'border-[#00d4aa] text-[#00d4aa]'
                              }`}
                            >
                              {edu.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills Section */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#ff6b6b]" />
                  Skills
                </h3>
                <div className="space-y-6">
                  {Object.entries(mockSkills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gradient-to-r from-[#00d4aa]/10 to-[#45b7d1]/10 text-[#00d4aa] border-[#00d4aa]/20 hover:from-[#00d4aa]/20 hover:to-[#45b7d1]/20 transition-all duration-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[#ffd93d]" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#ffd93d]/5 to-[#ff6b6b]/5"
                    >
                      <div className="w-2 h-2 bg-[#ffd93d] rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-[#00d4aa]/5 to-[#45b7d1]/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-4">Let's Work Together</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Interested in collaborating or have a project in mind?
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] hover:from-[#00b894] hover:to-[#3498db] text-white"
                  asChild
                >
                  <a href="/contact">
                    <Download className="w-4 h-4 mr-2" />
                    Get In Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;