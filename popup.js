document.addEventListener('DOMContentLoaded', () => {
       console.log("Popup: DOM loaded");
       const toggleButton = document.getElementById('toggleButton');
       if (!toggleButton) {
         console.error("Popup: toggleButton not found");
         return;
       }
       let isScanning = false;

       console.log("Popup: Requesting scanning state");
       chrome.runtime.sendMessage({ action: 'getScanningState' }, response => {
         console.log("Popup: Received scanning state", response);
         isScanning = response ? response.isScanning : false;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
       });

       toggleButton.addEventListener('click', () => {
         console.log("Popup: Button clicked, isScanning:", isScanning);
         isScanning = !isScanning;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
         chrome.runtime.sendMessage({ action: 'setScanningState', isScanning });
       });
     });