import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Clock,
  MessageCircle 
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message Sent!",
          description: response.data.message,
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Handle different error types
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.response?.status === 429) {
        errorMessage = error.response.data.detail?.message || "Too many requests. Please try again later.";
      } else if (error.response?.status === 422) {
        errorMessage = error.response.data.detail?.message || "Please check your input and try again.";
      } else if (error.response?.data?.detail?.message) {
        errorMessage = error.response.data.detail.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hsidra10@gmail.com",
      href: "mailto:hsidra10@gmail.com",
      color: "text-[#ff6b6b]"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8791539377",
      href: "tel:+918791539377",
      color: "text-[#00d4aa]"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dehradun, India",
      href: "#",
      color: "text-[#45b7d1]"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/sidrah-star",
      color: "hover:text-[#6c5ce7]",
      description: "Check out my code repositories"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/sidra-hussain123/",
      color: "hover:text-[#45b7d1]",
      description: "Connect with me professionally"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-[#00d4aa]" />
                  Send me a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="transition-all focus:ring-2 focus:ring-[#00d4aa]/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="transition-all focus:ring-2 focus:ring-[#00d4aa]/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, idea, or just say hello..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-[150px] transition-all focus:ring-2 focus:ring-[#00d4aa]/20"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#00d4aa] to-[#45b7d1] hover:from-[#00b894] hover:to-[#3498db] text-white border-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href === "#" ? (
                          <p className="font-medium">{info.value}</p>
                        ) : (
                          <a
                            href={info.href}
                            className={`font-medium ${info.color} hover:underline`}
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Follow Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-transparent hover:shadow-lg transition-all ${social.color} group`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{social.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {social.description}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-gradient-to-br from-[#00d4aa]/5 to-[#45b7d1]/5 border-[#00d4aa]/20">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-[#00d4aa] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  I typically respond to messages within 24 hours. Looking forward to connecting!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;