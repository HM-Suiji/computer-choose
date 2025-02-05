import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts'

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#9C27B0',
	'#E91E63',
	'#4CAF50',
	'#FFC107',
	'#795548',
	'#673AB7',
	'#03A9F4',
]

const MyPieChart: React.FC<{ data: { name: string; value: number }[] }> = ({
	data,
}) => {
	const total = data.reduce((acc, curr) => acc + curr.value, 0)
	return (
		<PieChart width={400} height={400}>
			<Pie
				data={data}
				cx={200}
				cy={200}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
				label>
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
				<Label
					value={`总计: ${total}`}
					position="center"
					fill="#333"
					fontSize={14}
					fontWeight="bold"
				/>
			</Pie>
			<Tooltip />
			<Legend />
		</PieChart>
	)
}

export { MyPieChart as PieChart }
