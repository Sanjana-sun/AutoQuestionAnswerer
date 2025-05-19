document.addEventListener('DOMContentLoaded', () => {
  console.log("Popup loaded");
  document.addEventListener('DOMContentLoaded', () => {
       const toggleButton = document.getElementById('toggleButton');
       let isScanning = false;

       chrome.runtime.sendMessage({ action: 'getScanningState' }, response => {
         isScanning = response.isScanning;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
       });

       toggleButton.addEventListener('click', () => {
         isScanning = !isScanning;
         toggleButton.textContent = isScanning ? 'Stop Scanning' : 'Start Scanning';
         chrome.runtime.sendMessage({ action: 'setScanningState', isScanning });
       });
     });
  // ... rest of the code
});


     