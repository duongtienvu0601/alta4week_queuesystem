import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { service } from "../../types";
import {
    addData,
    getAllDataInColection,
} from "../../config/firebase/firestore";

export const getAllServices = createAsyncThunk("Service: GET ALL", async () => {
    try {
        const res = await getAllDataInColection("services");
        return res;
    } catch (error) {
        return [];
    }
});

export const createNewService = createAsyncThunk(
    "Service: CREATE SERVICE",
    async (service: service) => {
        const res = await addData(service, "services");
        if (res.status === true) return res.data;
        // return res.data;
    }
);

type serviceSliceType = {
    services: service[];
    isFilter: boolean;
    service: service;
    filterServices: service[];
};

const initialState: serviceSliceType = {
    services: [],
    isFilter: false,
    service: {
        id: "",
        activeStatus: "",
        description: "",
        serviceCode: "",
        serviceName: "",
        rule: [],
    },
    filterServices: [],
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setFilterServices: (state, action) => {
            state.filterServices = action.payload;
        },
        setService: (state, action) => {
            state.service = action.payload;
        },
        clearService: (state, action) => {
            state.service = {
                id: "",
                activeStatus: "",
                description: "",
                serviceCode: "",
                serviceName: "",
                rule: [],
            };
        },
        updateService: (state, action) => {
            state.services = action.payload;
        },
        updateIsFilterService: (state, action) => {
            state.isFilter = action.payload;
        }

    },
    extraReducers(builder) {
        builder.addCase(getAllServices.fulfilled, (state, action) => {
            state.services = action.payload;
        });
        builder.addCase(createNewService.fulfilled, (state, action) => {
            state.services = [...state.services, action.payload as service];
        });
    },
});

export const { setFilterServices, setService, updateIsFilterService,clearService, updateService } = serviceSlice.actions;

export default serviceSlice.reducer;
