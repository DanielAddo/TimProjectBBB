import React, { useState, useEffect } from 'react';
import { pluginApi, ActionButtonDropdownOption, ActionButtonDropdownSeparator } from 'path-to-your-plugin-api';

const YourComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control the search bar visibility
  const [currentUser, setCurrentUser] = useState(null); // Define your state or context to get the current user
  const [currentPresentation, setCurrentPresentation] = useState(null); // Your current presentation state
  const [showingGenericContentInPresentationArea, setShowingGenericContentInPresentationArea] = useState(false); // Your presentation area state

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev); // Toggles the search bar visibility
  };

  useEffect(() => { 
    if (currentUser?.presenter) {
      pluginApi.setActionButtonDropdownItems([
        new ActionButtonDropdownSeparator(),
        new ActionButtonDropdownOption({
          label: 'Fetch presentation TEST content',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: () => {
            handleFetchPresentationData(currentPresentation);
          },
        }),
        new ActionButtonDropdownOption({
          label: showingGenericContentInPresentationArea ? 'Return previous presentation content' : 'Set different content in presentation area',
          icon: 'copy',
          tooltip: 'this is a button injected by plugin',
          allowed: true,
          onClick: handleChangePresentationAreaContent,
        }),
        new ActionButtonDropdownOption({
          label: isSearchOpen ? 'Close Search' : 'Open Search', // Dynamically changes based on search bar state
          icon: 'search',
          tooltip: 'Open a search bar to send prompts',
          allowed: true,
          onClick: toggleSearchBar,
        }),
      ]);
    }
  }, [currentPresentation, currentUser, showingGenericContentInPresentationArea, isSearchOpen]);

  // Function to handle fetching presentation data
  const handleFetchPresentationData = (presentation) => {
    // Your fetch logic here
  };

  // Function to handle presentation content changes
  const handleChangePresentationAreaContent = () => {
    setShowingGenericContentInPresentationArea((prev) => !prev); // Toggle presentation area content
  };

  return (
    <div>
      {/* Render SearchPlugin component if isSearchOpen is true */}
      {isSearchOpen && <SearchPlugin />}
    </div>
  );
};

export default YourComponent;
