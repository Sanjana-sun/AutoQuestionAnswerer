// Scans the webpage for questions and logs them to the console
     function scanForQuestions() {
       // Create a tree walker to get all text nodes in the document
       const walker = document.createTreeWalker(
         document.body,
         NodeFilter.SHOW_TEXT,
         { acceptNode: node => NodeFilter.FILTER_ACCEPT }
       );
       const questions = [];
       let node;
       while (node = walker.nextNode()) {
         const text = node.textContent.trim();
         // Simple heuristic: look for sentences ending with '?'
         if (text.endsWith('?')) {
           questions.push(text);
         }
       }
       return questions;
     }

     // Run the scan and log questions
     console.log("Auto Question Answerer: Starting scan...");
     const questions = scanForQuestions();
     if (questions.length > 0) {
       console.log("Found questions:", questions);
     } else {
       console.log("No questions found on the page.");
     }