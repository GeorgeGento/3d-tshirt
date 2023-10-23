import { useState } from 'react'

import { editorTabs } from '@/utils/constants'
import { AiPicker, ColorPicker, FilePicker } from '.';
import state from '@/store';
import { reader } from '@/utils/helpers';

const EditorTabs = () => {
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState({
        colorPicker: false,
        filePicker: false,
        aiPicker: false
    });

    const handleActiveEditor = (tabName: string) => {
        switch (tabName) {
            case "colorPicker":
                setActiveEditorTab((state) => ({
                    colorPicker: !state.colorPicker,
                    filePicker: false,
                    aiPicker: false
                }));
                break;
            case "filePicker":
                setActiveEditorTab((state) => ({
                    colorPicker: false,
                    filePicker: !state.filePicker,
                    aiPicker: false
                }));
                break;
            case "aiPicker":
                setActiveEditorTab((state) => ({
                    colorPicker: false,
                    filePicker: false,
                    aiPicker: !state.aiPicker
                }));
                break;
        }
    }

    const handleDecals = (type: "logo" | "full", result: any) => {
        switch (type) {
            case "logo": {
                state["logoDecal"] = result;
            } break;

            case "full": {
                state["fullDecal"] = result;
            } break;

            default: {
                state["logoDecal"] = "./threejs.png";
                state["fullDecal"] = "./threejs.png";
            } break;
        }
    }

    const readFile = (type: "logo" | "full") => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);
                setActiveEditorTab((state) => ({ ...state, filePicker: false }))
            })
    }

    const handleSubmit = async (type: "logo" | "full") => {
        if (!prompt) return alert("Please enter a prompt");

        try {
            setGeneratingImg(true);

            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const data = await fetch(`${apiUrl}/api/v1/ai/generate-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            }).then(async (res) => {
                if (res.ok) return await res.json();

                return null;
            })
            if (!data) return alert(`Something went wrong.`);

            handleDecals(type, data.photo);
        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab((state) => ({ ...state, aiPicker: false }));
        }
    }

    return (
        <div className="editortabs-container tabs">
            {editorTabs.map((tab) => (
                <div
                    key={tab.name}
                    className='tab-btn rounded-4'
                    onClick={() => handleActiveEditor(tab.name)}
                >
                    <img
                        src={tab.icon}
                        alt={tab.name}
                        className='w-11/12 h-11/12 object-contain'
                    />
                </div>
            ))}

            {activeEditorTab.colorPicker && (<ColorPicker />)}
            {activeEditorTab.filePicker && (
                <FilePicker file={file} setFile={setFile} readFile={readFile} />
            )}
            {activeEditorTab.aiPicker && (
                <AiPicker
                    prompt={prompt} setPrompt={setPrompt}
                    isGeneratingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    )
}

export default EditorTabs