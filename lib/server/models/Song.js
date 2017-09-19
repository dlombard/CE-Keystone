const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Song Model
 * ==========
 */

var Song = new keystone.List('Song', {
    map: { name: 'title' },
    track: true,
});

Song.add({
    title: { type: String, },
    num: { type: Number },
    book: {
        name: { type: String },
        abbrv: { type: String },
        languages: { type: String, many: true }
    },
    lyrics: { type: String },
    lyrics_Markdown: { type: Types.Markdown, markedOptions: { breaks: true } },
    lyrics_Html: { type: Types.Html, wysiwyg: true },
    tags: { type: String, many: true },
    videos: { type: String, many: true },
    references: {
        author: { type: String },
        book: { type: String },
        year: { type: String },
    },
    partitions: { type: String, many: true },
    language: { type: String },
    songId: { type: String, },


});
Song.set('timestamps', { createdAt: 'createdAt', updatedAt: 'updatedAt' });
Song.register();
