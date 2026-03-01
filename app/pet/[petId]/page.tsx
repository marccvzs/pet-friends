import { InquiryForm } from "@/app/_components/form/Inquiry";

export default async function PetPage({ params }: { params: Promise<{ petId: string}> }) {
    const { petId } = await params;
    console.log('[+] :', petId);

    return (
        <div className="bg-white">
            <p className="text-black text-2xl">{petId}</p>
            <div className="bg-blue-500 p-2">
                <InquiryForm />
            </div>
        </div>
    )
};
