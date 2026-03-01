import scenes from './art.json' with { type: 'json' };

export { scenes as default };

export function getArt(variant = null) {
  const index =
    variant !== null ? variant : Math.floor(Math.random() * scenes.length);
  return scenes[index];
}
