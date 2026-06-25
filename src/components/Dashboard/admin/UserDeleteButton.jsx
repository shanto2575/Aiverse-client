"use client";

import { showToast } from "@/components/Utility/toast";
import { authClient } from "@/lib/auth-client";
import { baseUrl } from "@/lib/baseUrl";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserDeleteButton({ userId, setUserList }) {
    const router = useRouter()
    const handleDelete = async (id) => {
        const tokenData = await authClient.token();

        const token = tokenData?.data?.token;
        // console.log(token)
        const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });

        const data = await res.json();

        if (data.deletedCount > 0) {
            setUserList((prev) =>
                prev.filter((user) => user._id !== id)
            );

            showToast.success("User deleted successfully");
            router.refresh()
        }
    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <button
                    className="p-2 rounded-lg bg-red-600/10 text-red-600 hover:bg-red-600/20 transition cursor-pointer"
                    title="Delete User"
                >
                    <Trash2 size={16} />
                </button>
            </AlertDialog.Trigger>

            <AlertDialog.Backdrop className="backdrop-blur-md bg-[#2c221e]/40 transition-all duration-300">
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#ebdcc9] border border-[#dfcbaf] shadow-2xl rounded-2xl">
                        <AlertDialog.CloseTrigger className="text-[#2c221e]/60 hover:text-[#2c221e]" />

                        <AlertDialog.Header className="flex flex-col gap-1">
                            <AlertDialog.Icon
                                status="danger"
                                className="text-red-600 bg-red-600/10"
                            />
                            <AlertDialog.Heading className="text-lg font-bold text-[#2c221e] mt-2">
                                Delete user permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body className="p-6">
                            <p className="text-sm text-[#2c221e]/80 leading-relaxed">
                                Are you sure you want to delete this user account?
                                This action cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="flex items-center justify-end gap-3 pt-4 border-t border-[#dfcbaf] mt-2">
                            <Button
                                slot="close"
                                variant="tertiary"
                                className="px-4 py-2 text-[#2c221e] hover:bg-[#2c221e]/10 rounded-xl font-bold uppercase text-xs cursor-pointer"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() => handleDelete(userId)}
                                slot="close"
                                variant="danger"
                                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase text-xs cursor-pointer"
                            >
                                Delete User
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}