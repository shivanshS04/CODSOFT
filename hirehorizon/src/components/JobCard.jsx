export default function JobCard({ data }) {
    return (
        <div className="bg-blue-50 dark:bg-amber-950/70 p-3 rounded-lg w-5/6 cursor-pointer">
            <div className="flex flex-col md:flex-row items-start justify-start md:justify-between">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">{data.job_title}</h3>
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Rs. {data.expected_salary}/year</h3>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6"></p>

        </div>
    )
}