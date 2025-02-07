import { parse } from 'csv-parse/browser/esm/sync'
import { stringify } from 'csv-stringify/browser/esm/sync'

export const generateCSV = <
	T extends string | number,
	K extends string | number | boolean,
>(
	data: Record<T, K>[]
) =>
	stringify(
		data.map((item) => {
			const _item = { ...item }
			for (const key in _item) {
				if (typeof _item[key] === 'boolean') {
					_item[key] = _item[key] ? 'true' : ('false' as any)
				}
			}
			return _item
		}),
		{
			header: true,
		}
	)

export const parseCSV = (data: string | Buffer) =>
	parse(data, {
		columns: true,
	}).map((item: Record<string | number, string | number | boolean>) => {
		for (const key in item) {
			if (item[key] === 'true') {
				item[key] = true
			} else if (item[key] === 'false') {
				item[key] = false
			} else if (typeof item[key] === 'string') {
				const tmp = Number(item[key] as string)
				if (!Number.isNaN(tmp)) {
					item[key] = tmp
				}
			}
		}
		return item
	}) as Record<string | number, string | number | boolean>[]
