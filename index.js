import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './data/schema';
import resolvers from './data/resolver';

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQl is amazing!');
});

// const root = { hello: () => "Hi, I'm Krishna" };

// const root = {
//     product: () => {
//         return {
//             "id": 123,
//             "name": "Product 1",
//             "price": 100.50,
//             "description": "Product description 1",
//             "soldout": true,
//             "stores": [
//                 { store: "Kolkata" },
//                 { store: "San Francisco" }
//             ],
//         }

//     },
//     createProduct: ({ input }) => {
//         let id = require('crypto').randomBytes(10).toString('hex');
//         productDb[id] = input;
//         return new Product(id, input);
//     }
// };

const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8000, () => console.log('listening on localhost:8000/graphql'));