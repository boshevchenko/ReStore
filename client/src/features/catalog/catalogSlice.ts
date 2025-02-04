import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: [];
    types: [];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParamms: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParamms.pageNumber.toString());
    params.append('pageSize', productParamms.pageSize.toString());
    params.append('orderBy', productParamms.orderBy);
    if (productParamms.searchTerm)
        params.append('searchTerm', productParamms.searchTerm);
    if (productParamms.brands && productParamms.brands.length > 0)
        params.append('brands', productParamms.brands.toString());
    if (productParamms.types && productParamms.types.length > 0)
        params.append('types', productParamms.types.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            // return await agent.Catalog.list(params);
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const deleteProductAsync = createAsyncThunk<number, number>(
    'catalog/deleteProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Admin.deleteProduct(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        orderBy: 'name',
        pageNumber: 1,
        pageSize: 6
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {
                ...state.productParams,
                ...action.payload
            }
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {
                ...state.productParams,
                ...action.payload
            }
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        },
        resetProductsLoaded: (state) => {
            state.productsLoaded = false;
        },
        setUpdatedProduct: (state, action) => {
            state.productsLoaded = false;
            console.log(...state.ids, { ...action.payload });
            productsAdapter.updateOne(state, action.payload);
        },
        setCreatedProduct: (state, action) => {
            state.productsLoaded = false;
            console.log(...state.ids, { ...action.payload });
            productsAdapter.addOne(state, action.payload);
        },
        removeProduct: (state, action) => {
            state.productsLoaded = false;
            console.log(...state.ids, { ...action.payload });
            productsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingAfetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingAfetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingAfetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.status = 'idle';
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(deleteProductAsync.pending, (state) => {
            state.status = 'pendingDeleteProduct';
        });
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
            state.productsLoaded = false;
            productsAdapter.removeOne(state, action.payload)
            state.status = 'idle';
        });
        builder.addCase(deleteProductAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
})

export const productSelectors = productsAdapter
    .getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams, setMetaData,
    setPageNumber, setUpdatedProduct, setCreatedProduct,
    resetProductsLoaded, removeProduct
} = catalogSlice.actions;