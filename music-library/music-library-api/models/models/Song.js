const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Artist = require('./Artist');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Song.belongsTo(Artist, { foreignKey: 'artistId' });
Artist.hasMany(Song, { foreignKey: 'artistId' });

module.exports = Song;
