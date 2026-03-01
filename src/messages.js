import messages from './messages.json' with { type: 'json' };

export { messages as default };

export function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
