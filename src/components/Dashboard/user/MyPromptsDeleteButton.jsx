"use client";

import { baseUrl } from "@/lib/baseUrl";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function MyPromptsDeleteButton({item}) {
  const router=useRouter()
  const handleDelete=async(id)=>{
  
    const res=await fetch(`${baseUrl}/api/prompts/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data=await res.json()
    // console.log(data)
    if(data.deletedCount>0){
     toast.success("Delete successfully");
            router.refresh();
    }
  }
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <button
          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 rounded-xl border border-rose-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop className="backdrop-blur-md bg-black/20 transition-all duration-300">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#ebdcc9] border border-[#dfcbaf] shadow-2xl rounded-2xl">
            <AlertDialog.CloseTrigger className="text-[#2c221e]/60 hover:text-[#2c221e]" />
            
            <AlertDialog.Header className="flex flex-col gap-1">
              <AlertDialog.Icon status="danger" className="text-rose-600 bg-rose-500/10" />
              <AlertDialog.Heading className="text-lg font-bold text-[#2c221e] mt-2">
                Delete prompt permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="p-6 bg-[#ebdcc9]">
              <p className="text-sm font-medium text-[#2c221e]/80 leading-relaxed">
              Are you absolutely sure you want to delete this prompt template? This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-[#dfcbaf] mt-2">
              <Button 
                slot="close" 
                variant="tertiary"
                className="px-4 py-2 bg-transparent text-[#2c221e] hover:bg-[#2c221e]/5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-200 cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
              onClick={()=>handleDelete(item._id)}
                slot="close" 
                type='submit'
                variant="danger"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-md transition-all duration-200 cursor-pointer"
              >
                Delete Prompt
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}