import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowRight, Code2, Brain, Zap } from "lucide-react";

const Home = () => {
  const highlights = [
    {
      icon: Brain,
      text: "ML Practitioner",
      color: "text-[#00d4aa]",
      bgColor: "bg-[#00d4aa]/10",
    },
    {
      icon: Code2,
      text: "Full-Stack Developer",
      color: "text-[#45b7d1]",
      bgColor: "bg-[#45b7d1]/10",
    },
    {
      icon: Zap,
      text: "AI Enthusiast",
      color: "text-[#ffd93d]",
      bgColor: "bg-[#ffd93d]/10",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-[#00d4aa]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20">
                  <span className="text-sm font-medium text-[#00d4aa]">
                    ✨ Welcome to my portfolio
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-[#00d4aa] via-[#45b7d1] to-[#ff6b6b] bg-clip-text text-transparent">
                    Sidra Hussain
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  Machine Learning Practitioner and{" "}
                  <span className="text-[#ff6b6b] font-semibold">
                    AI Innovator
                  </span>
                </p>
                
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Passionate about transforming complex data into intelligent solutions. 
                  I build ML models, create predictive systems, and develop full-stack 
                  applications that make a real-world impact.
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-4">
                {highlights.map((highlight, index) => {
                  const IconComponent = highlight.icon;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`px-4 py-2 ${highlight.bgColor} ${highlight.color} border-0`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {highlight.text}
                    </Badge>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] hover:from-[#00b894] hover:to-[#3498db] text-white border-0"
                >
                  <Link to="/projects" className="inline-flex items-center">
                    View Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white"
                >
                  <Link to="/contact">
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Animated Background Shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 bg-gradient-to-r from-[#00d4aa]/20 to-[#45b7d1]/20 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ffd93d]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
                
                {/* Central Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00d4aa] via-[#45b7d1] to-[#6c5ce7] rounded-full flex items-center justify-center">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#00d4aa]">
                        8+ Projects
                      </h3>
                      <p className="text-muted-foreground">
                        ML & Full-Stack Solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projects Completed", value: "8+", color: "text-[#00d4aa]" },
              { label: "Technologies", value: "15+", color: "text-[#45b7d1]" },
              { label: "ML Models", value: "10+", color: "text-[#ff6b6b]" },
              { label: "Certifications", value: "6+", color: "text-[#ffd93d]" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;