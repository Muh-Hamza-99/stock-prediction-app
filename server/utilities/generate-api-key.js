const  generateAPIKey = () => {
  return Math.random().toString(36).substring(2,32);
};

module.exports = generateAPIKey;