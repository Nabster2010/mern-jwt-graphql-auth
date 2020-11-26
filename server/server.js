const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		createdAt: String!
		token: String!
	}
	input SignupInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
	}
	type Query {
		login(email: String!, password: String!): User!
	}
	type Mutation {
		signup(signupInput: SignupInput!): User!
	}
`;
const resolvers = {
	Query: {
		login: async (_, { email, password }, context, info) => {
			// TODO: validate user inputs
			// TODO: compare passwords
			// TODO: generate token

			try {
				const user = await User.findOne({ email, password });
				if (!user) throw new Error('User not found');
				return user;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		signup: async (_, args, context, info) => {
			const { username, email, password, confirmPassword } = args.signupInput;
			// TODO: password vs confirmPassword
			// TODO: validate user inputs
			// TODO: ensure unique Email
			// TODO: encrypt the password
			// TODO: generate jwt token
			const newUser = new User({
				username,
				email,
				password,
			});
			const user = await newUser.save();
			return {
				...user._doc,
			};
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('database connected');
		server.listen().then(({ url }) => console.log(`server runinng at ${url}`));
	});
