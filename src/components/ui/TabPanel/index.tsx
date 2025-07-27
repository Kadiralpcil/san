// TabPanel.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {  useLocation } from 'react-router-dom';

// Veya react-router-dom v6 kullanılıyorsa:
// import { useNavigate, useLocation } from 'react-router-dom';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabPanelProps {
  tabs: Tab[];
  initialTabId?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs, initialTabId }) => {
  // react-router-dom v5 için
  const location = useLocation();

  // react-router-dom v6 için
  // const navigate = useNavigate();
  // const location = useLocation();

  const getTabFromUrl = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab');
  }, [location.search]);

  const [activeTabId, setActiveTabId] = useState<string>(
    initialTabId || getTabFromUrl() || tabs[0]?.id
  );

  useEffect(() => {
    const urlTab = getTabFromUrl();
    if (urlTab && tabs.some(tab => tab.id === urlTab) && urlTab !== activeTabId) {
      setActiveTabId(urlTab);
    } else if (!urlTab && activeTabId !== tabs[0]?.id) {
      // URL'de tab yoksa ve başlangıçta belirlenen tab ilk tab değilse, URL'yi güncelle
    //   history.replace(`?tab=${activeTabId}`);
    }
  }, [getTabFromUrl, tabs, activeTabId, history]); // history'i bağımlılık olarak ekliyoruz

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    // history.push(`?tab=${tabId}`); // URL'yi güncelle
    // Veya react-router-dom v6 için: navigate(`?tab=${tabId}`);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content;

  return (
    <div className="dark min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              py-2 px-4 text-sm font-medium focus:outline-none
              ${
                activeTabId === tab.id
                  ? 'border-b-2 border-purple-500 text-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        {activeTabContent}
      </div>
    </div>
  );
};

export default TabPanel;