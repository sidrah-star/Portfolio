import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/sidrah-star",
      icon: Github,
      color: "hover:text-[#6c5ce7]",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sidra-hussain123/",
      icon: Linkedin,
      color: "hover:text-[#45b7d1]",
    },
    {
      name: "Email",
      url: "mailto:hsidra10@gmail.com",
      icon: Mail,
      color: "hover:text-[#ff6b6b]",
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className={`transition-colors ${link.color}`}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sidra Hussain. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Machine Learning Practitioner • AI Enthusiast • Problem Solver
            </p>
          </div>

          {/* Colorful Accent */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d4aa] via-[#45b7d1] to-[#ff6b6b] rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;