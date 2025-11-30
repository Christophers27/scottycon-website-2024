"use client";

import { BiBug } from "react-icons/bi";
import { useState } from "react"
import Cookies from "js-cookie";
import { sendReport } from "@/app/actions";

export default function BugReport() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        let count = Number(Cookies.get("bugCount") ?? 0);
        if (count >= 3){
            setError("Bug not submitted due to rate limiting.");
        }
        else {
            console.log("Bug Submitted:", { title, description });
            const response = await sendReport(title, description)
            if (response){
                count += 1;
                Cookies.set("bugCount", count.toString(), { expires: 2 });
                console.log("Total bugs submitted:", count);
                setError("Bug submitted successfully. ✅");
            }
            else {
                setError("Bug not submitted due to serverside error.");
            }
        }
        setTitle("");
        setDescription("");
    }
    return(
        <div>
            <button
            className="fixed bottom-17 left-2 bg-white text-black w-10 h-10 rounded-full
                    shadow-lg text-3xl flex items-center justify-center hover:scale-110
                    hover:text-scottycon-pink active:scale-95 active:text-scottycon-pink transition"
            onClick={() => {
                setShowOverlay(!showOverlay);
                setError("");
            }}>
                <BiBug className="text-2xl"/>
            </button>

            { showOverlay &&
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl pointer-events-auto h-3/4 w-3/4">
                        <h1 className="section-title">
                            Submit A Bug Report
                        </h1>
                        { (error != "") && 
                        <p className="text-red-500 text-center font-bold mb-4 text-sm">{error}</p>
                        }
                        <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full h-full">
                        <input
                            type="text"
                            placeholder="Bug Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-black"
                            required
                        />
                        <textarea
                            placeholder="Briefly describe the bug and how to reproduce..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 h-32 resize-none text-black"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-scottycon-pink text-white py-2 rounded-lg hover:opacity-90 active:scale-95 transition"
                        >
                            Submit Bug
                        </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}