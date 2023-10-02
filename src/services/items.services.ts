import axios from "axios"
import dotenv from 'dotenv';
dotenv.config()

const getRequest = async (url: string) => {
	try {
		const result = await axios.get(url)
		return result.data
	} catch (error: any) {
		console.log(error.message);
	}
}
export const getItemsService = async (query: any) => {

	const url = `${process.env.MELI_URL}sites/MLA/search?q=${query}`
	const items = await getRequest(url)
	return items

}
export const getItemService = async (id: string) => {
	const url = `${process.env.MELI_URL}items/${id}`
	const item = await getRequest(url)
	return item
}
export const getItemDescriptionService = async (id: string) => {
	const url = `${process.env.MELI_URL}items/${id}/description`
	const item = await getRequest(url)
	return item
}