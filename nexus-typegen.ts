/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthType: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Brand: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Cart: { // root type
    creatorId?: number | null; // Int
    id?: number | null; // Int
    productId?: number | null; // Int
  }
  Mutation: {};
  OrderItem: { // root type
    id: number; // Int!
    quantity: number; // Int!
    subtotal: number; // Float!
    unit_price: number; // Float!
  }
  Product: { // root type
    available: boolean; // Boolean!
    brandId: number; // Int!
    categoryId: number; // Int!
    creatorId: number; // Int!
    description: string; // String!
    id: number; // Int!
    name: string; // String!
    price: number; // Float!
  }
  ProductImage: { // root type
    id?: number | null; // Int
    key?: string | null; // String
    productId?: number | null; // Int
  }
  Query: {};
  Review: { // root type
    createdAt: string; // String!
    id: number; // Int!
    rating: number; // Int!
    review_text: string; // String!
    title: string; // String!
  }
  User: { // root type
    address?: string | null; // String
    email: string; // String!
    first_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    phone_number?: string | null; // String
    username: string; // String!
  }
  Wishlist: { // root type
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Brand: { // field return type
    id: number; // Int!
    name: string; // String!
  }
  Cart: { // field return type
    creatorId: number | null; // Int
    id: number | null; // Int
    productId: number | null; // Int
  }
  Mutation: { // field return type
    addReview: NexusGenRootTypes['Review']; // Review!
    addToWishlist: NexusGenRootTypes['Wishlist']; // Wishlist!
    createProduct: NexusGenRootTypes['Product']; // Product!
    deleteReview: NexusGenRootTypes['Review']; // Review!
    login: NexusGenRootTypes['AuthType']; // AuthType!
    register: NexusGenRootTypes['AuthType']; // AuthType!
    removeFromWishlist: boolean; // Boolean!
  }
  OrderItem: { // field return type
    id: number; // Int!
    quantity: number; // Int!
    subtotal: number; // Float!
    unit_price: number; // Float!
  }
  Product: { // field return type
    ImageDetail: NexusGenRootTypes['ProductImage'] | null; // ProductImage
    available: boolean; // Boolean!
    brandId: number; // Int!
    categoryId: number; // Int!
    createdBy: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    description: string; // String!
    id: number; // Int!
    name: string; // String!
    price: number; // Float!
  }
  ProductImage: { // field return type
    id: number | null; // Int
    key: string | null; // String
    productId: number | null; // Int
  }
  Query: { // field return type
    Review: NexusGenRootTypes['Review'][]; // [Review!]!
    Wishlist: NexusGenRootTypes['Wishlist'][]; // [Wishlist!]!
    fetchCart: NexusGenRootTypes['Cart']; // Cart!
    fetchProduct: NexusGenRootTypes['Product'][]; // [Product!]!
    fetchProductByBrand: NexusGenRootTypes['Product'][]; // [Product!]!
    fetchProductByCategory: NexusGenRootTypes['Product'][]; // [Product!]!
    products: NexusGenRootTypes['Product'][]; // [Product!]!
    userData: NexusGenRootTypes['User']; // User!
  }
  Review: { // field return type
    createdAt: string; // String!
    id: number; // Int!
    rating: number; // Int!
    review_text: string; // String!
    title: string; // String!
  }
  User: { // field return type
    address: string | null; // String
    email: string; // String!
    first_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    phone_number: string | null; // String
    username: string; // String!
  }
  Wishlist: { // field return type
    id: number; // Int!
    product: NexusGenRootTypes['Product']; // Product!
  }
}

export interface NexusGenFieldTypeNames {
  AuthType: { // field return type name
    token: 'String'
    user: 'User'
  }
  Brand: { // field return type name
    id: 'Int'
    name: 'String'
  }
  Cart: { // field return type name
    creatorId: 'Int'
    id: 'Int'
    productId: 'Int'
  }
  Mutation: { // field return type name
    addReview: 'Review'
    addToWishlist: 'Wishlist'
    createProduct: 'Product'
    deleteReview: 'Review'
    login: 'AuthType'
    register: 'AuthType'
    removeFromWishlist: 'Boolean'
  }
  OrderItem: { // field return type name
    id: 'Int'
    quantity: 'Int'
    subtotal: 'Float'
    unit_price: 'Float'
  }
  Product: { // field return type name
    ImageDetail: 'ProductImage'
    available: 'Boolean'
    brandId: 'Int'
    categoryId: 'Int'
    createdBy: 'User'
    creatorId: 'Int'
    description: 'String'
    id: 'Int'
    name: 'String'
    price: 'Float'
  }
  ProductImage: { // field return type name
    id: 'Int'
    key: 'String'
    productId: 'Int'
  }
  Query: { // field return type name
    Review: 'Review'
    Wishlist: 'Wishlist'
    fetchCart: 'Cart'
    fetchProduct: 'Product'
    fetchProductByBrand: 'Product'
    fetchProductByCategory: 'Product'
    products: 'Product'
    userData: 'User'
  }
  Review: { // field return type name
    createdAt: 'String'
    id: 'Int'
    rating: 'Int'
    review_text: 'String'
    title: 'String'
  }
  User: { // field return type name
    address: 'String'
    email: 'String'
    first_name: 'String'
    id: 'Int'
    last_name: 'String'
    phone_number: 'String'
    username: 'String'
  }
  Wishlist: { // field return type name
    id: 'Int'
    product: 'Product'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addReview: { // args
      productId: number; // Int!
      rating: number; // Int!
      review_text: string; // String!
      title: string; // String!
    }
    addToWishlist: { // args
      productId: number; // Int!
    }
    createProduct: { // args
      available: boolean; // Boolean!
      brandId: number; // Int!
      categoryId: number; // Int!
      description: string; // String!
      name: string; // String!
      price: number; // Float!
    }
    deleteReview: { // args
      reviewId: number; // Int!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    removeFromWishlist: { // args
      productId: number; // Int!
    }
  }
  Query: {
    Review: { // args
      productId: number; // Int!
    }
    fetchProduct: { // args
      productId: number; // Int!
    }
    fetchProductByBrand: { // args
      brandId: number; // Int!
    }
    fetchProductByCategory: { // args
      categoryId: number; // Int!
    }
    products: { // args
      searchKeyword?: string | null; // String
    }
    userData: { // args
      userId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}