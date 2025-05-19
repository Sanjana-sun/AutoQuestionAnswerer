let isScanning = false;

     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
       console.log("Background: Received message", request);
       if (request.action === 'getScanningState') {
         console.log("Background: Sending isScanning", isScanning);
         sendResponse({ isScanning });
       } else if (request.action === 'setScanningState') {
         isScanning = request.isScanning;
         console.log("Background: Set isScanning to", isScanning);
         chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
           if (tabs[0]) {
             console.log("Background: Sending toggleScanning to tab", tabs[0].id);
             chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleScanning', isScanning });
           } else {
             console.error("Background: No active tab found");
           }
         });
         sendResponse({ success: true });
       }
     });