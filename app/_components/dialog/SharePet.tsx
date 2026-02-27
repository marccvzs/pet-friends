import { Dialog } from "@base-ui/react/dialog";
import QRCode from "react-qr-code";

export default function SharePet() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-[#EDECE7] p-2">
        {"+"}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-screen bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-8em)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#A18AB7] outline-1 outline-gray-200 text-black flex flex-col items-center">
          <Dialog.Title>{"Pet Name"}</Dialog.Title>
          <QRCode value="Pet Name" size={50}/>
          <div>
            <Dialog.Close>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
