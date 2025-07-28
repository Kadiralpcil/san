import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  onClick: () => void;
}

interface TabPanelProps {
  tabs: Tab[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  // Hooks
  const location = useLocation();
  
  // Handlers
  const getActiveTabFromUrl = useCallback(() => {
    return location.pathname.split("/").pop();
  }, [location]);

  const activeTabContent = tabs.find((tab) => tab.id === getActiveTabFromUrl())?.content;

  return (
    <div className="text-gray-100 p-4 w-full ">
      <div className="flex justify-between border-b border-gray-700 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.onClick}
            className={`
              py-2 px-4 flex-1 transition-all cursor-pointer
              ${
                 getActiveTabFromUrl() === tab.id
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
        {activeTabContent}
    </div>
  );
};

export default TabPanel;
