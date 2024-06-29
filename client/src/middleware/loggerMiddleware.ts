import { Middleware } from "redux";

const loggerMiddleware: Middleware<{}, any, any> =
    (store) => (next) => (action: any) => {
        console.group(action.type); // Group logs by action type
        console.log("Dispatching:", action); // Log dispatched action
        const result = next(action); // Call the next middleware or reducer
        console.log("Next state:", store.getState()); // Log updated state
        console.groupEnd(); // End group for action type
        return result;
    };

export default loggerMiddleware;
