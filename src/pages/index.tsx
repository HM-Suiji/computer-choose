import DefaultLayout from '@/layouts/default'
import { PartForm } from '@/components/part-form'
import { PartTable } from '@/components/part-table'
import { SchemeTab } from '@/components/scheme-tab'

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="w-full flex flex-row gap-8">
					<PartForm />
					<PartTable />
				</div>
				<SchemeTab />
			</section>
		</DefaultLayout>
	)
}
