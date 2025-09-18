import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
type Category {
  id: ID!
  name: String!
  slug: String!
  image: String!
}

type Product {
  id: ID!
  title: String!
  slug: String!
  price: Float!
  description: String!
  images: [String!]!
  category: Category!
}

type Query {
  products(limit: Int, offset: Int, categoryId: Float, title: String): [Product!]!
  product(id: ID!): Product
  categories: [Category!]!
}
`;

import products from './dataset-clean.js';

const resolvers = {
  Query: {
    products: (_, { limit, offset, categoryId, title }) => {
      let result = products;

      if (categoryId) {
        result = result.filter((p) => p.category.id === String(categoryId));
      }

      if (title) {
        result = result.filter((p) =>
          p.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      if (typeof offset === 'number') result = result.slice(offset);
      if (typeof limit === 'number') result = result.slice(0, limit);

      return result;
    },

    product: (_, { id }) => products.find((p) => p.id === id),
    categories: () => {
      const seen = new Map();
      return products
        .map((p) => p.category)
        .filter((cat) => {
          if (seen.has(cat.id)) return false;
          seen.set(cat.id, true);
          return true;
        });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 8086 },
});

console.log(`🚀 Server ready at ${url}`);
