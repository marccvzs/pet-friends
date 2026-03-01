import AddPet from "@/app/_components/form/AddPet";

export default async function UserPage({
    params
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params;


    return (
        <div className="bg-gray-300 px-4 py-8 flex flex-col gap-4 justify-between">
            <p className="text-black text-2xl">{`Hi, ${userId}`}</p>
            <AddPet />
        </div>
    )
};
