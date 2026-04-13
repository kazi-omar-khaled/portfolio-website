import React, { useState, useRef } from 'react';
import { projects, categories } from '../../data/projects';
import {
  Briefcase,
  Target,
  Globe,
  Palette,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import FadeIn from '../animations/FadeIn';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // ✅ FIXED FILTER (case-insensitive + safe)
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (project) =>
            project.category?.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim()
        );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth / 3;

      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProjects.length - 3);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  // ✅ ICON MAP WITH SAFE FALLBACK
  const categoryIcons = {
    All: Target,
    'Web Apps': Globe,
    'UI Components': Palette,
    'Full Stack': Zap,
  };

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>

            <h2 className="text-4xl lg:text-5xl text-white mb-4">
              Featured Projects
            </h2>

            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Showcasing my best work and achievements
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Briefcase;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative px-6 py-3 rounded-full font-medium ${
                    activeCategory === category
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all ${
                      activeCategory === category
                        ? 'bg-primary/10'
                        : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                    }`}
                  />

                  <div className="relative flex items-center gap-2">
                    <Icon />
                    <span className="text-sm">{category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Projects */}
        <FadeIn delay={200}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              <div className="flex gap-6 pb-4">

                {/* ✅ EMPTY STATE */}
                {filteredProjects.length === 0 ? (
                  <p className="text-white text-center w-full">
                    No projects found in this category
                  </p>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))
                )}

              </div>
            </div>
          </div>
        </FadeIn>

        {/* Navigation Arrows */}
        {filteredProjects.length > 3 && (
  <>
    {/* LEFT BUTTON */}
    <button
      onClick={prevSlide}
      disabled={currentIndex === 0}
      className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20
      w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center
      rounded-full backdrop-blur-lg bg-white/10 border border-white/20
      shadow-lg hover:bg-primary/60 hover:scale-105
      transition-all duration-300
      disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label="Previous projects"
    >
      <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
    </button>

    {/* RIGHT BUTTON */}
    <button
      onClick={nextSlide}
      disabled={currentIndex >= filteredProjects.length - 3}
      className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20
      w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center
      rounded-full backdrop-blur-lg bg-white/10 border border-white/20
      shadow-lg hover:bg-primary/60 hover:scale-105
      transition-all duration-300
      disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label="Next projects"
    >
      <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
    </button>
  </>
)}

        {/* Dots */}
        {filteredProjects.length > 3 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: Math.max(0, filteredProjects.length - 2),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-primary w-6 h-2'
                    : 'bg-white/30 w-2 h-2'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;