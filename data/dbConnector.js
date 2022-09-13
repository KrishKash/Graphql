import mongoose from 'mongoose';
import { Sequelize, DataTypes } from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/widgets', {
    useNewUrlParser: true
});

const widgetSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    soldout: { type: String },
    inventory: { type: String },
    stores: { type: Array }

});

const Widgets = mongoose.model('widgets', widgetSchema);

//SEQUELIZE
const sequelize = new Sequelize('sqlite::memory:')

const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

Categories.sync({ force: true }).then(() => {
    _.times(5, (i) => {
        Categories.create({
            category: casual.word,
            description: casual.sentence,
        });
    });

});

export { Widgets, Categories };