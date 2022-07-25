import { createTypedHooks } from 'easy-peasy'; // 👈import the helper
import { StoreInterface } from './store'; // 👈 import our model type

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreInterface>();

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
