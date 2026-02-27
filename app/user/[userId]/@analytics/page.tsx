export default async function AnalyticsPage({ params }: { params: Promise<{ userId: string }>}) {
    const { userId } = await params;

    return (
        <div className="bg-amber-500">
            <p className="text-black">Analytics for {userId}</p>
        </div>
    )
}