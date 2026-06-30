const fs = require('fs');
const path = require('path');

const enDir = path.join('src', 'translations', 'en');
const teDir = path.join('src', 'translations', 'te');

if (!fs.existsSync(teDir)) {
  fs.mkdirSync(teDir, { recursive: true });
}

const files = fs.readdirSync(enDir).filter(f => f.endsWith('.ts'));

const dict = {
  "Home": "హోమ్",
  "Terminal": "టెర్మినల్",
  "Playground": "ప్లేగ్రౌండ్",
  "Start Learning": "నేర్చుకోవడం ప్రారంభించండి",
  "Language": "భాష",
  "FAQ": "FAQ",
  "Disaster Lab": "డిజాస్టర్ ల్యాబ్",
  "Welcome to the Git Terminal Simulator!": "Git టెర్మినల్ సిమ్యులేటర్‌కు స్వాగతం!",
  "Enter a command...": "ఒక కమాండ్ ఎంటర్ చేయండి...",
  "Cancel": "రద్దు చేయండి",
  "Save": "సేవ్ చేయండి",
  "File Content": "ఫైల్ కంటెంట్",
  "Unsaved": "సేవ్ చేయబడలేదు",
  "Commit Changes": "మార్పులను కమిట్ చేయండి",
  "Usage:": "వాడుక:",
  "Example:": "ఉదాహరణ:",
  "Explanation:": "వివరణ:",
  "Current Challenge": "ప్రస్తుత సవాలు",
  "Objectives": "లక్ష్యాలు",
  "Hints": "సూచనలు",
  "Learn Git through interactive games": "ఆటల ద్వారా Git నేర్చుకోండి",
  "Master Git by doing. Interactive tutorials, real-world scenarios, and visual learning.": "ఇంటరాక్టివ్ ట్యుటోరియల్స్ మరియు విజువల్ లెర్నింగ్ ద్వారా Git మాస్టర్ చేయండి.",
};

for (const file of files) {
  let content = fs.readFileSync(path.join(enDir, file), 'utf8');
  
  for (const [enStr, teStr] of Object.entries(dict)) {
    // Basic replacement for string values
    content = content.split(`"${enStr}"`).join(`"${teStr}"`);
    content = content.split(`'${enStr}'`).join(`'${teStr}'`);
  }
  
  fs.writeFileSync(path.join(teDir, file), content);
}
console.log('Copied and translated files to te/');
