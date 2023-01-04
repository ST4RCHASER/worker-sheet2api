import { getRawHtmlUrl, queryStringToObject, tableToJSON } from "./libs/parser";

export default {
	async fetch(
		request: Request,
		ctx: ExecutionContext
	): Promise<Response> {
		const { searchParams } = new URL(request.url)
		const sheetUrl = searchParams.get('url')
		const sheetId = searchParams.get('sheet') || '0'
		const workbookId = sheetUrl?.split('/')[5] || sheetUrl
		if (!workbookId) return new Response('No workbook found')
		console.log('raw', getRawHtmlUrl(workbookId, sheetId));
		const text = await fetch(getRawHtmlUrl(workbookId, sheetId)).then(async (res) => await res.text())
		if (!text) return new Response('No response error')
		if (text.includes('https://accounts.google.com/v3/signin')) return new Response('This workbook is not public')
		return new Response(JSON.stringify(await tableToJSON(text, queryStringToObject(request.url))));
	},
};
