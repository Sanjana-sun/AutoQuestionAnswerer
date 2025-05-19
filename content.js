let isScanning = false;
     let scanInterval = null;

     function scanForQuestions() {
       const walker = document.createTreeWalker(
         document.body,
         NodeFilter.SHOW_TEXT,
         { acceptNode: node => NodeFilter.FILTER_ACCEPT }
       );
       const questions = [];
       let node;
       while (node = walker.nextNode()) {
         const text = node.textContent.trim();
         if (text.endsWith('?')) {
           questions.push(text);
         }
       }
       return questions;
     }

     function generateAnswer(question) {
       return `Answer to "${question}": This is a placeholder response.`;
     }

     function displayAnswer(question, answer) {
       const div = document.createElement('div');
       div.style.position = 'fixed';
       div.style.top = '10px';
       div.style.right = '10px';
       div.style.backgroundColor = 'white';
       div.style.border = '1px solid black';
       div.style.padding = '10px';
       div.style.zIndex = '10000';
       div.style.maxWidth = '300px';
       div.style.fontSize = '14px';
       div.textContent = `${question}\n${answer}`;
       document.body.appendChild(div);
       setTimeout(() => div.remove(), 5000);
     }

     function scanAndDisplay() {
       console.log("Content: Starting scan...");
       const questions = scanForQuestions();
       if (questions.length > 0) {
         console.log("Content: Found questions:", questions);
         questions.forEach(question => {
           const answer = generateAnswer(question);
           console.log("Content: Generated answer:", answer);
           displayAnswer(question, answer);
         });
       } else {
         console.log("Content: No questions found on the page.");
       }
     }

     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
       console.log("Content: Received message", request);
       if (request.action === 'toggleScanning') {
         isScanning = request.isScanning;
         console.log("Content: isScanning set to", isScanning);
         if (isScanning && !scanInterval) {
           console.log("Content: Starting scan interval");
           scanAndDisplay();
           scanInterval = setInterval(scanAndDisplay, 5000);
           console.log("Auto Question Answerer: Scanning started.");
         } else if (!isScanning && scanInterval) {
           console.log("Content: Stopping scan interval");
           clearInterval(scanInterval);
           scanInterval = null;
           console.log("Auto Question Answerer: Scanning stopped.");
         }
       }
     });