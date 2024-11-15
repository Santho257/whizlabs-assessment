import axios from "axios"
import { BACKEND } from "../../constants"

export const deleteItem = async id => {
    const dlt = await axios.delete(`${BACKEND}/items/${id}`);
    if (dlt.data.success)
        return dlt.data.message;
    else
        return dlt.data.message;
}