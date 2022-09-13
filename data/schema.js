import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Product{
        id: ID
        name: String
        price:Float
        description: String
        soldout: SoldOut
        inventory:Int
        stores:[Store]!
    }
    
    enum SoldOut{
        SOLD
        ONSALE
    }

    type Store {
        store:String
    }

    type Query{
        hello: String
        product: Product
        getProduct(id:ID): Product
        getAllProduct: [Product]
    }

    input StoreInput {
        store:String
    }

    input ProductInput {
        id: ID
        name: String
        price:Float
        description: String
        soldout: SoldOut
        inventory:Int
        stores:[StoreInput]!
    }

    type Mutation{
        createProduct(input:ProductInput): Product
        updateProduct(input:ProductInput): Product
        deleteProduct(id:ID): String
    }
    
`)

export default schema;