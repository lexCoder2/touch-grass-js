const messages = [
  'Congratulations. You have successfully remembered that outside exists.',
  'Your IDE will still be there. Regrettably.',
  'The compiler says: skill issue. Grass says: come here.',
  'Stack Overflow has been there for you. Have YOU been there for vitamin D?',
  'Breaking: local developer discovers world beyond 80-column terminal.',
  'You have been in dark mode for 14 hours. The sun has better rendering.',
  'Your PR will wait. Your mitochondria will not.',
  '404: outdoor time not found. Initiating emergency protocol.',
  "Today's forecast: touch grass, high of 72°F, zero merge conflicts.",
  'npm install outside completed successfully. 0 vulnerabilities.',
  'git push yourself. Outside. Now.',
  'ERROR: Too much terminal. SOLUTION: Unplug face from monitor.',
  'Doctors hate this one weird trick: going outside.',
  "You've read more man pages today than a park ranger does in a year.",
  'The grass is always greener outside. Mostly because you are never there.',
  "Your linter found 0 issues. Your therapist found several.",
  "You can't merge a PR if you're outside. Sounds like a personal problem.",
  'BREAKING: Grass has better documentation than Stack Overflow.',
  'Tree.render() is working perfectly. Better than your last deploy.',
  "Touching grass: The only bug fix that actually heals you.",
  'Chlorophyll? More like Chloro-FEEL the sunshine.',
  "Your keyboard: still broken after 12 hours. Grass: still free.",
  'Ctrl+Alt+Delete your schedule and go outside.',
  "Sunscreen applied. Jira ticket: still haunting you. Go outside anyway.",
  'Roses are red, violets are blue, touch grass right now or you might lose your mind too.',
  'System.out.println("I went outside and it was weird but nice");',
  'Type: grass. Import: fresh air. Compile: success. Status: HUMAN.',
  "If you can't find the bug, the bug is probably behind you (it's a tree).",
  'Your standup can wait. Your Vitamin D levels cannot.',
  "New error: `touch: grass not found`. Seek grass immediately.",
  'DEBUG: why do I feel better outside? ANS: because you are finally alive.',
];


export function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export default messages;
