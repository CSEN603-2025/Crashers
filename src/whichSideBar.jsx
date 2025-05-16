import React from 'react';
import StudentSlidingSidebar from './SlidingSidebar';
import SCADSidebar from './scadSide';
import SlidingSidebarPro from './slidingBarPro';
import CompSlidingSidebar from './slidingBar';
import FacultySidebar from './FacultySide';

const RenderSidebar = ({
  role,
  sidebarWidth,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  switch (role) {
    case 'student':
      return (
        <StudentSlidingSidebar
          setShowProfile={() => {}}
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    case 'pro':
      return (
        <SlidingSidebarPro
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    case 'company':
      return (
        <CompSlidingSidebar
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    case 'scad':
      return (
        <SCADSidebar
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    case 'faculty':
      return (
        <FacultySidebar
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      );
    default:
      return null;
  }
};

export default RenderSidebar;
