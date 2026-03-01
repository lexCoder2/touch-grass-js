const scenes = [
  {
    title: '~ The Meadow ~',
    scene: `     \\  |  /          *    *
      \\ | /       *          *
  ____\\_|_/____
  |    \\|/    |    The sun is out.
  |           |    Your screen is not.
  |___________|
  |I|I|I|I|I|I|
  /\\/\\/\\/\\/\\/\\/\\
~~~~~~~~~~~~~~~~~`,
  },
  {
    title: '~ The Park ~',
    scene: `        ^        *   *
       /|\\          *
      / | \\
  ___/  |  \\___
 (  touch    )
  \\  grass  /
   \\       /
~~~~~~~~~~~~~~~~~~~~`,
  },
  {
    title: '~ The Mountain ~',
    scene: `         *
        /|\\
       / | \\
      /  |  \\
     /   |   \\
~~~~~~~~~~~~~~~~~~~~
  go. outside. now.`,
  },
];

export function getArt(variant = null) {
  const index = variant !== null ? variant : Math.floor(Math.random() * scenes.length);
  return scenes[index];
}

export default scenes;
