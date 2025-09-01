// Mock data for frontend development
export const mockProjects = [
  {
    id: 1,
    title: "Heart Disease Prediction System",
    description: "Web-based ML system predicting heart disease using Logistic Regression, SVM, and MLP Classifier with role-based access for Admin, Doctor, and Patient.",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap", "SQLite", "scikit-learn"],
    githubLink: "https://github.com/sidrah-star/Heart-Disease-Prediction-System",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    category: "Machine Learning",
    featured: true
  },
  {
    id: 2,
    title: "Customer Churn Analysis",
    description: "Telecom Customer Churn Prediction system with interactive Streamlit app for real-time and batch predictions using Random Forest and XGBoost.",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "scikit-learn", "Streamlit"],
    githubLink: "https://github.com/sidrah-star/Customer-Churn-Analysis",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "Data Science",
    featured: true
  },
  {
    id: 3,
    title: "Crop Recommendation System",
    description: "ML model using Random Forest Classifier to recommend optimal crops based on soil nutrients, pH, temperature, humidity, and rainfall with Flask backend.",
    technologies: ["Flask", "scikit-learn", "HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/sidrah-star/Agrigrow-Crop-Recommendation-System",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
    category: "Machine Learning",
    featured: true
  },
  {
    id: 4,
    title: "Real-Time Object Detection with YOLO",
    description: "Real-time object detection system using YOLO, capable of identifying multiple objects with high accuracy from live camera feeds with GPU acceleration.",
    technologies: ["Python", "OpenCV", "YOLOv5", "YOLOv8"],
    githubLink: "https://github.com/sidrah-star/Real-Time-Object-Detection-with-YOLO",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    category: "Computer Vision",
    featured: true
  },
  {
    id: 5,
    title: "Spotify Clone",
    description: "Fully functional Spotify clone with play/pause, next/previous track, seek bar, volume control, and responsive design using JavaScript Audio API.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/sidrah-star/spotify-clone",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Web Development",
    featured: false
  },
  {
    id: 6,
    title: "Kaggle Titanic Survival Prediction",
    description: "Classification model for Kaggle's Titanic ML competition, predicting passenger survival using Random Forest Classifier with data cleaning and feature engineering.",
    technologies: ["Python", "pandas", "scikit-learn", "Kaggle API"],
    githubLink: "https://github.com/sidrah-star/Kaggle-Titanic-Survival-Prediction",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Machine Learning",
    featured: false
  },
  {
    id: 7,
    title: "Salary Prediction System",
    description: "ML model predicting employee salaries based on experience, education, and role with interactive visualizations deployed via Streamlit.",
    technologies: ["Python", "scikit-learn", "Streamlit"],
    githubLink: "https://github.com/sidrah-star/Salary-Prediction-System",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    category: "Machine Learning",
    featured: false
  },
  {
    id: 8,
    title: "Loan Approval System",
    description: "ML model predicting loan approval status based on applicant income, credit history, and financial factors with user-friendly web application.",
    technologies: ["Python", "scikit-learn", "Flask"],
    githubLink: "https://github.com/sidrah-star/Loan-Approval-System-Application",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop",
    category: "Machine Learning",
    featured: false
  }
];

export const mockSkills = {
  "Programming Languages": ["Python", "C", "C++", "SQL"],
  "Web Development": ["HTML", "CSS", "JavaScript"],
  "ML/AI Frameworks": ["TensorFlow", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  "Tools & Platforms": ["Jupyter Notebook", "Google Colab", "Git & GitHub", "Kaggle API"],
  "Web Frameworks": ["Flask", "Django", "Streamlit"],
  "Databases": ["SQLite", "MongoDB"],
  "Other": ["OpenCV", "YOLOv5/v8", "Bootstrap"]
};

export const mockBio = `I'm a passionate Machine Learning Practitioner and AI enthusiast currently pursuing my Bachelor of Engineering in Computer Science with specialization in Artificial Intelligence & Machine Learning from Graphic Era Deemed to be University, Dehradun.

With hands-on experience in data science, machine learning, and full-stack development, I have successfully completed 8+ projects ranging from predictive healthcare systems to real-time computer vision applications. My expertise spans across Python, machine learning algorithms, web development, and deployment of ML models.

During my internship at Upflairs Pvt. Ltd. as a Data Science with Machine Learning & AI Intern, I gained valuable experience working with real-world datasets, implementing various ML algorithms including Linear Regression, Decision Trees, Random Forest, KNN, and Neural Networks.

I'm particularly interested in applying AI/ML solutions to solve real-world problems in healthcare, agriculture, finance, and computer vision. My goal is to contribute to the advancement of artificial intelligence and create impactful solutions that make a difference in people's lives.`;

export const mockContactSubmit = async (formData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock successful submission
  console.log('Mock form submission:', formData);
  return {
    success: true,
    message: 'Thank you for your message! I\'ll get back to you soon.'
  };
};