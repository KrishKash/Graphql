import { reject } from 'lodash';
import { Widgets } from './dbConnector';

// class Product {
//     constructor(id, { name, description, price, soldout, inventory, stores }) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.price = price;
//         this.soldout = soldout;
//         this.inventory = inventory;
//         this.stores = stores;
//     }
// }

// const productDb = {};

// const resolvers = {
//     getProducts: ({ id }) => {
//         return new Product(id, productDb[id]);
//     },
//     createProduct: ({ input }) => {
//         let id = require('crypto').randomBytes(10).toString('hex');
//         productDb[id] = input;
//         return new Product(id, input);
//     }
// };

export const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.findById({ _id: id }, (err, product) => {
                if (err) reject(err)
                else resolve(product)
            })
        });
    },

    getAllProduct: () => {
        return Widgets.find({})
    },

    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });

        newWidget.id = newWidget._id;
        return new Promise((resolve) => {
            newWidget.save((err) => {
                if (err) reject(err)
                else resolve(newWidget)
            });
        });
    },

    updateProduct: ({ input }) => {
        return new Promise((resolve) => {
            Widgets.findOneAndUpdate(
                { _id: input.id },
                input,
                { new: true },
                (err, widget) => {
                    if (err) reject(err)
                    else resolve(widget)
                })
        })
    },

    deleteProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.remove(
                { _id: id },
                (err) => {
                    if (err) reject(err)
                    else resolve(`Successfully deleted ${id}`)
                })
        })
    }
};

export default resolvers;