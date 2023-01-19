import { useOutletContext } from "react-router-dom";

type ContextType = { setOpenSnacBar:(state:boolean)=>void };

export function useSnackbar() {
    return useOutletContext<ContextType>();
}