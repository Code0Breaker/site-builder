import { useOutletContext } from "react-router-dom";

type ContextType = { setOpenSnacBar:(state:boolean)=>void, errorText:string, setErrorText:(state:string)=>void };

export function useSnackbar() {
    return useOutletContext<ContextType>();
}