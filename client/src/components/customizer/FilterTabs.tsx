import state from '@/store';
import { cn } from '@/utils';
import { filterTabs } from '@/utils/constants'
import { useSnapshot } from 'valtio';

const FilterTabs = () => {
    const snap = useSnapshot(state);

    const handleActiveFilterTab = (tabName: string) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !snap.isLogoTexture;
                break;
            case "stylishShirt":
                state.isFullTexture = !snap.isFullTexture;
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }
    }

    return (
        <>
            {filterTabs.map((tab) => (
                <div
                    key={tab.name}
                    className={cn(
                        'tab-btn rounded-full glassmorphism',
                        snap[tab.name === "logoShirt" ? "isLogoTexture" : "isFullTexture"] ?
                            "bg-red-500`" :
                            "bg-transparent opacity-50"
                    )}
                    onClick={() => handleActiveFilterTab(tab.name)}
                >
                    <img
                        src={tab.icon}
                        alt={tab.name}
                        className='w-2/3 h-2/3'
                    />
                </div>
            ))}
        </>
    )
}


export default FilterTabs