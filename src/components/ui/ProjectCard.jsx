import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, technologies, projectUrl } = project;

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">

      <div className="flex flex-col gap-4 p-5 bg-gradient-to-t from-black via-black/60 to-transparent h-full">

        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#A8FF8D] transition-colors duration-300 leading-snug break-words">
            {title}
          </h3>

          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-primary/50 transition-all duration-300 hover:scale-110 shrink-0"
              title="View Project"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
        </div>

        {/* Description (FULLY VISIBLE ✅) */}
        <p className="text-white/70 text-sm leading-relaxed break-words whitespace-normal">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;