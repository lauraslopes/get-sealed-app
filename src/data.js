export const TRANSLATIONS = [
  { code: 'EN', name: 'English', tag: 'NVI', desc: 'New International Version', bibleId: '111' },
  { code: 'PT', name: 'Português (Brasil)', tag: 'NVI', desc: 'Nova Versão Internacional', bibleId: '4360' },
  { code: 'FR', name: 'Français', tag: 'NVI', desc: 'Nouvelle Version Internationale', bibleId: '21' },
  { code: 'ES', name: 'Español', tag: 'NVI', desc: 'Nueva Versión Internacional', bibleId: '1637' },
];

export const CHAPTERS = [
  ['The Revelation of Jesus Christ', 22], ['Letters to Seven Churches (I)', 29],
  ['Letters to Seven Churches (II)', 22], ['The Throne in Heaven', 11],
  ['The Scroll and the Lamb', 14], ['The Seven Seals', 17], ['The 144,000 Sealed', 17],
  ['The Great Multitude', 17], ['The Seventh Seal', 21], ['The Seven Trumpets', 21],
  ['The Angel and the Little Scroll', 11], ['The Two Witnesses', 19], ['The Woman and the Dragon', 20],
  ['The Beasts', 18], ['The Lamb and the 144,000', 20], ['The Seven Bowls', 21],
  ['Babylon Falls', 21], ['Songs of Victory', 24], ['The Thousand Years', 21],
  ['The New Jerusalem', 15], ['The River of Life', 27], ['Closing Words', 21],
].map(([title, verses], index) => ({ id: index + 1, title, verses }));

export const SAMPLE_VERSES = {
  '1:1': 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.',
  '1:2': 'who testifies to everything he saw—that is, the word of God and the testimony of Jesus Christ.',
  '1:3': 'Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near.',
  '1:4': 'John, To the seven churches in the province of Asia: Grace and peace to you from him who is, and who was, and who is to come, and from the seven spirits before his throne,',
  '1:5': 'and from Jesus Christ, who is the faithful witness, the firstborn from the dead, and the ruler of the kings of the earth.',
};
