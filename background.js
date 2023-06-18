chrome.action.onClicked.addListener(async (tab) => {
    const imageUrls = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const images = document.querySelectorAll('img');
        return Array.from(images).map((img) => img.src);
      },
    });
  
    imageUrls.forEach((imageUrl) => {
      chrome.downloads.download({
        url: imageUrl,
        conflictAction: 'uniquify',
      });
    });
  });
  