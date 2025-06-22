import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ✅ Async thunk for fetching mails from API
export const fetchMail = createAsyncThunk(
  'mail/fetchMail',
  async () => {
    const response = await fetch('/api/mails'); // Replace with real API endpoint
    const data = await response.json();
    return data;
  }
);

// ✅ Initial mail state
const initialState = {
  mails: [],
  status: 'idle',
  selectedMail: null,
  sendMessageIsOpen: false,
  error: null,
};

// ✅ Slice for mail state
export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    addMail: (state, action) => {
      state.mails.push(action.payload);
    },
    deleteMail: (state, action) => {
      state.mails = state.mails.filter(mail => mail.id !== action.payload);
    },
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mails = action.payload;
      })
      .addCase(fetchMail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// ✅ Action creators
export const {
  addMail,
  deleteMail,
  selectMail,
  openSendMessage,
  closeSendMessage,
} = mailSlice.actions;

// ✅ Selectors
export const selectMails = (state) => state.mail.mails;
export const selectSelectedMail = (state) => state.mail.selectedMail;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectMailStatus = (state) => state.mail.status;
export const selectMailError = (state) => state.mail.error;

// ✅ Reducer export
export default mailSlice.reducer;