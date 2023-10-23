import { Button } from "../Button";

type AiPickerProps = {
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    isGeneratingImg: boolean;
    handleSubmit: (type: "logo" | "full") => void;
}

const AiPicker = ({
    prompt, setPrompt, isGeneratingImg, handleSubmit
}: AiPickerProps) => {
    return (
        <div className="aipicker-container">
            <textarea
                placeholder="Ask AI..."
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="aipicker-textarea"
            />

            <div className="flex flex-wrap gap-3">
                {isGeneratingImg && (
                    <Button
                        variant="outline"
                        className="text-xs"
                    >Asking AI...</Button>
                )}

                {!isGeneratingImg && (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => handleSubmit('logo')}
                            className="text-xs"
                        >AI Logo</Button>

                        <Button
                            variant="filled"
                            onClick={() => handleSubmit('full')}
                            className="text-xs"
                        >AI Full</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default AiPicker