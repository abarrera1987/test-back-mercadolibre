import { Request, Response } from "express"
import { getItemDescriptionService, getItemService, getItemsService } from "../services/items.services"
import { NewItems } from '../interfaces/items.interface'
import { NewCategories } from "../interfaces/categories.interface"
import { DetailItem } from "../interfaces/detail.interface"

// funcion encargada de traer los items
export const getItems = async (req: Request, res: Response) => {
	try {
		const query = req.query.q
		const itemsResult = await getItemsService(query)
		const [categories, items] = await Promise.all([
			organizeCategories(itemsResult),
			organizeItems(itemsResult),
		])

		res.status(200).json({
			author: {
				name: "Alexander",
				lastname: "Escobar",
			},
			categories,
			items
		})
	} catch (error: any) {
		res.status(400).json({
			author: {
				name: "Alexander",
				lastname: "Escobar",
			},
			error: error.message,
		})
	}
}

// Funcion para organizar items
const organizeItems = (itemsResult: any): NewItems[] => {
	return itemsResult.results
		.sort((a: any, b: any) => a.order_backend - b.order_backend)
		.slice(0, 4)
		.map((item: any) => ({
			id: item.id,
			title: item.title,
			price: {
				currency: item.currency_id,
				amount: item.price,
				decimals: 0 // No encontre decimales asi que lo dejo en 0
			},
			picture: item.thumbnail,
			condition: item.condition,
			free_shipping: item.shipping.free_shipping,
		}))
}

// Funcion para organizar las categorias
const organizeCategories = (itemsResult: any): NewCategories[] => {
	const categoryFilter = itemsResult.available_filters.find(
		(element: any) => element.id === "category"
	)
	if (!categoryFilter) return []
	return categoryFilter.values
		.sort((a: any, b: any) => a.results - b.results)
		.slice(0, 4)
		.map((cat: any) => cat.name)
}

// Funcion encargada de traer los detalles del item
export const getItem = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const [itemInfo, description] = await Promise.all([
			getItemService(id),
			getItemDescriptionService(id),
		])
		const item: DetailItem = {
			id: itemInfo.id,
			title: itemInfo.title,
			price: {
				currency: itemInfo.currency_id,
				amount: itemInfo.price,
				decimals: 0, // No encontre decimales asi que lo dejo en 0
			},
			picture: itemInfo.pictures[0].url,
			condition: itemInfo.condition,
			free_shipping: itemInfo.shipping.free_shipping,
			sold_quantity: itemInfo.sold_quantity,
			description: description.plain_text,
		}
		res.status(200).json({
			author: {
				name: "Alexander",
				lastname: "Escobar",
			},
			item,
		})
	} catch (error: any) {
		res.status(400).json({
			author: {
				name: "Alexander",
				lastname: "Escobar",
			},
			error: error.message,
		})
	}
}
