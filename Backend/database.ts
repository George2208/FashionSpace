import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare username: string
	declare firstname: string
	declare lastname: string
	declare password: string
}

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
	declare id: number
	declare name: string
}

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
	declare name: string
	declare description: string
	declare size: string
	declare image: string
	declare price: number
	declare CategoryId: ForeignKey<number>
}

export async function connect () {
	const sequelize = new Sequelize('sqlite::memory:', {logging: undefined})
	User.init({
		username: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true
		},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		password: DataTypes.STRING
	}, {sequelize})
	Category.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		name: DataTypes.STRING
	}, {sequelize})
	Product.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		size: DataTypes.STRING,
		image: DataTypes.STRING,
		price: DataTypes.FLOAT,
		CategoryId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, {sequelize})

	Category.hasOne(Product)
	Product.belongsTo(Category)

	await sequelize.sync()
	console.log('Database connected')
}
