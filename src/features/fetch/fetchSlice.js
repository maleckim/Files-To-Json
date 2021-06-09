import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AWS from 'aws-sdk';
import { fetchTest } from './fetchFolder';
import { uploadToS3 } from './uploadToFolder';
import { generatePreviews } from './generatePreviews';
import { retrievePreviews } from './retrievePreviews';
import { persistJson } from './persistJson';
import { getJson } from './getJson';

const initialState = {
  folders: [],
  successfulUploads: [],
  thumbURLs: [],
  finalizedThumbs: [],
  jsonPersisted: [],
  currentFolder: '',
  status: 'idle',
  thumbStatus: 'idle',
};

export const getBucketFolder = createAsyncThunk('s3/folder', async (res) => {
  const response = await fetchTest(res);

  return response;
});

export const uploadToFolder = createAsyncThunk('s3/upload', async (res) => {
  const response = await uploadToS3(res);

  return response;
});

export const createPreviews = createAsyncThunk('s3/preview', async (res) => {
  const response = await generatePreviews(res);

  return response;
});
export const getPreviews = createAsyncThunk('s3/retrieve', async (res) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function retryFetch(res) {
    const response = await retrievePreviews(res);

    if (response[0].status === 'success') {
      return response;
    }
    await delay(5000);
    return retryFetch(res);
  }
  return retryFetch(res);
});

export const persistData = createAsyncThunk('db/persist', async (res) => {
  const response = await persistJson(res);

  return response;
});

export const getData = createAsyncThunk('db/get', async (res) => {
  const response = await getJson(res);

  return response;
});

export const fetchSlice = createSlice({
  name: 'fetcher',
  initialState,

  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    addNewFolder: (state, action) => {
      const baseURL = '';
      const appendedURL = baseURL + action.payload;
      state.folders = [...state.folders, appendedURL];
    },
    getJson: (state, action) => {
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);
        for (const [key, val] of Object.entries(action.payload)) {
          state.jsonPersisted = [...state.jsonPersisted, val];
        }
      })
      .addCase(getData.rejected, (state, action) => {});

    builder
      .addCase(persistData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(persistData.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);

        console.log(action);
      });

    builder
      .addCase(getPreviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPreviews.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);
        const tempAction = action;
        try {
          tempAction.payload.map(
            (thumbRes) =>
              (state.finalizedThumbs = [
                ...state.finalizedThumbs,
                thumbRes.thumbnails[0].url,
              ])
          );
        } catch (error) {
          console.log(error);
          state = initialState;
        }
      });

    builder
      .addCase(createPreviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPreviews.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);

        action.payload.map(
          (goodRes) => (state.thumbURLs = [...state.thumbURLs, goodRes.url])
        );
      });

    builder
      .addCase(uploadToFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadToFolder.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);
        const tempAction = action;
        tempAction.payload.map(
          (goodRes) =>
            (state.successfulUploads = [
              ...state.successfulUploads,
              goodRes.Location,
            ])
        );
      });

    builder
      .addCase(getBucketFolder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBucketFolder.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.responses = state.responses.concat(action.payload.results);
        action.payload.CommonPrefixes.map(
          (prefix) => (state.folders = [...state.folders, prefix.Prefix])
        );
      });
  },
});

export const { addNewFolder, setCurrentFolder } = fetchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const viewRes = (state) => state.fetcher.folders;
export const currentFolder = (state) => state.fetcher.currentFolder;
export const successfulUpload = (state) => state.fetcher.successfulUploads;
export const thumbURLs = (state) => state.fetcher.thumbURLs;
export const finalizedThumbs = (state) => state.fetcher.finalizedThumbs;
export const status = (state) => state.status;
export const jsonFromDir = (state) => state.fetcher.jsonPersisted;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default fetchSlice.reducer;
