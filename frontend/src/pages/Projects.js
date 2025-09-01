import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Github, ExternalLink, Filter, Star } from "lucide-react";
import { mockProjects } from "../mock/data";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Projects", count: mockProjects.length },
    { id: "Machine Learning", name: "Machine Learning", count: mockProjects.filter(p => p.category === "Machine Learning").length },
    { id: "Data Science", name: "Data Science", count: mockProjects.filter(p => p.category === "Data Science").length },
    { id: "Web Development", name: "Web Development", count: mockProjects.filter(p => p.category === "Web Development").length },
    { id: "Computer Vision", name: "Computer Vision", count: mockProjects.filter(p => p.category === "Computer Vision").length },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory);

  const featuredProjects = mockProjects.filter(project => project.featured);

  const getCategoryColor = (category) => {
    const colors = {
      "Machine Learning": "bg-[#00d4aa]/10 text-[#00d4aa] border-[#00d4aa]/20",
      "Data Science": "bg-[#45b7d1]/10 text-[#45b7d1] border-[#45b7d1]/20", 
      "Web Development": "bg-[#ff6b6b]/10 text-[#ff6b6b] border-[#ff6b6b]/20",
      "Computer Vision": "bg-[#ffd93d]/10 text-[#ffd93d] border-[#ffd93d]/20"
    };
    return colors[category] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const ProjectCard = ({ project }) => (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#ffd93d] text-black border-0">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d4aa] transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-[#6c5ce7] text-[#6c5ce7] hover:bg-[#6c5ce7] hover:text-white"
          asChild
        >
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            Code
          </a>
        </Button>
        {project.liveLink !== "#" && (
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] hover:from-[#00b894] hover:to-[#3498db] text-white border-0"
            asChild
          >
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of machine learning models, data science projects, and full-stack applications
          </p>
        </div>

        {/* Project Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full max-w-4xl mx-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-[#00d4aa] data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Featured Projects Tab */}
          <TabsContent value="all" className="mt-12">
            {/* Featured Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold">Featured Projects</h2>
                <Star className="w-6 h-6 text-[#ffd93d]" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* All Projects Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">All Projects</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  {filteredProjects.length} projects
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Category-specific tabs */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">{category.name} Projects</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  {filteredProjects.length} projects
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-[#00d4aa]/10 via-[#45b7d1]/10 to-[#ff6b6b]/10 rounded-2xl p-12">
            <h3 className="text-2xl font-bold mb-4">Want to collaborate?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, innovative projects, 
              and ways to bring AI/ML solutions to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] hover:from-[#00b894] hover:to-[#3498db] text-white border-0"
                asChild
              >
                <a href="/contact">Get In Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white"
                asChild
              >
                <a href="https://github.com/sidrah-star" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View All on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;