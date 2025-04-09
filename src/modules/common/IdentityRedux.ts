import {
    configureStore,
    createAction,
    createReducer,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {BetSlipFiltersData} from "@/app/betSlip/components/FilterKeeper/FilterKeeper";
import {aes256Decrypt, aes256Encrypt} from "@/utils/tools";
import {PageState} from "@/utils/StateContext";

// Action Types
const SET_UUID = 'SET_UUID';
const SET_ROLE = 'SET_ROLE';
const SET_USERNAME = 'SET_USERNAME';
const SET_EMAIL = 'SET_EMAIL';
const SET_BET_SLIP_FILTERS = 'SET_BET_SLIP_FILTERS';
const SET_BET_SLIP_LAST_FILTER = 'SET_BET_SLIP_LAST_FILTER';
const SET_CHANNEL_VALUE = 'SET_CHANNEL_VALUE'
const SET_CHANNEL_ID = 'SET_CHANNEL_ID'
const SET_ODDS_DISPLAY = 'SET_ODDS_DISPLAY'
const SET_PAGE_STATE = 'SET_PAGE_STATE'

// Create Actions
export const setUuid = createAction<string | null>(SET_UUID);
export const setRole = createAction<string | null>(SET_ROLE);
export const setUsername = createAction<string | null>(SET_USERNAME);
export const setEmail = createAction<string | null>(SET_EMAIL);
export const setBetSlipFilters = createAction<BetSlipFiltersData>(SET_BET_SLIP_FILTERS);
export const setBetSlipLastFilter = createAction<number>(SET_BET_SLIP_LAST_FILTER);
export const setChannelValue = createAction<string | null>(SET_CHANNEL_VALUE)
export const setChannelId = createAction<string | null>(SET_CHANNEL_ID);
export const setOddsDisplay = createAction<string | null>(SET_ODDS_DISPLAY);
export const setPageState = createAction<PageState>(SET_PAGE_STATE);

// Reducer State Interface
interface AuthState {
    /*** Represents the uuid.*/
    u: string | null;
    /*** Represents the role.*/
    r: string | null;
    /*** Represents the username.*/
    un: string | null;
    /*** Represents the email.*/
    e: string | null;
    /*** Represents the betSlipFilters.*/
    bf: BetSlipFiltersData;
    /*** Represents the betSlipLastFilter.*/
    blf: number;
    /*** Represents the channelValue.*/
    cv: string | null;
    /*** Represents the channelId.*/
    ci: string | null;
    /*** Represents the login query */
    lq: string | null;
    /*** Represents the odds display in event list page*/
    od: string | null;
    /*** Represents the page state */
    pg: PageState;
}

// Initial State
const initialState: AuthState = {
    u: null,
    r: null,
    un: null,
    e: null,
    bf: {},
    blf: 0,
    cv: null,
    ci: null,
    lq: null,
    od: null,
    pg: {}
};

// Create reducer
export const rootReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUuid, (state, action) => {
            state.u = action.payload;
        })
        .addCase(setRole, (state, action) => {
            state.r = action.payload;
        })
        .addCase(setUsername, (state, action) => {
            state.un = action.payload;
        })
        .addCase(setEmail, (state, action) => {
            state.e = action.payload;
        })
        .addCase(setBetSlipFilters, (state, action) => {
            state.bf = action.payload;
        })
        .addCase(setBetSlipLastFilter, (state, action) => {
            state.blf = action.payload;
        })
        .addCase(setChannelValue, (state, action) => {
            state.cv = action.payload;
        })
        .addCase(setChannelId, (state, action) => {
            state.ci = action.payload;
        })
        .addCase(setOddsDisplay, (state, action) => {
            state.od = action.payload;
        })
        .addCase(setPageState, (state, action) => {
            state.pg = action.payload;
        });
});

// Value encryption and decryption
const localAESKey = process.env.NEXT_PUBLIC_LOCAL_ENCRYPT_KEY || '';
const encryption = createTransform(
    (inboundState, key) => {
        const stateString = JSON.stringify(inboundState);
        return aes256Encrypt(stateString, localAESKey);
    },
    (outboundState, key) => {
        const stateString = aes256Decrypt(outboundState, localAESKey);
        return JSON.parse(stateString);
    }
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryption],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore serialization checks for specific actions
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
