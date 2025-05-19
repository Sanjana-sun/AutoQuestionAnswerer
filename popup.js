// Handle popup button click to toggle scanning
     document.addEventListener('DOMContentLoaded', () => {
       const toggleButton = document.getElementById('toggleButton');
       let isScanning = false;

       // Check initial scanning state (default: off)
       chrome.runtime.sendMessage({ action: 'getScanningState' }, response => {
         isScanning = response.isScanning;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
       });

       // Toggle scanning on button click
       toggleButton.addEventListener('click', () => {
         isScanning = !isScanning;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
         chrome.runtime.sendMessage({ action: 'setScanningState', isScanning });
       });
     });
     