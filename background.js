// Background script to manage scanning state
     let isScanning = false;

     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
       if (request.action === 'getScanningState') {
         sendResponse({ isScanning });
       } else if (request.action === 'setScanningState') {
         isScanning = request.isScanning;
         chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
           if (tabs[0]) {
             chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleScanning', isScanning });
           }
         });
         sendResponse({ success: true });
       }
     });
     