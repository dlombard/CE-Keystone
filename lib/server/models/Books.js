const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * Song Model
 * ==========
 */

var Book = new keystone.List('Book', {
    map: { name: 'name' },
    track: true,
});

Book.add({

    name: { type: String },
    abbrv: { type: String },
    languages: { type: String, many: true },
    img: { type: String },
    references: {
        author: { type: String },
        book: { type: String },
        year: { type: String },
    },

});
Book.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' });
Book.register();
