import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

// mui
import { Dialog, DialogTitle } from "@mui/material";

// component
import SearchResult from "../SearchResult";

const searchClient = algoliasearch(
  "KKY4RFETF5",
  "7c2ffce9f9a96749417bd3cb5ce7994d"
);

const NewChatDialog = ({ handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: "20px" }}>
      <DialogTitle sx={{ fontSize: "16px" }}>New Message</DialogTitle>

      <InstantSearch searchClient={searchClient} indexName="users">
        <SearchBox />
        <Hits hitComponent={SearchResult} />
      </InstantSearch>
    </Dialog>
  );
};

export default NewChatDialog;
