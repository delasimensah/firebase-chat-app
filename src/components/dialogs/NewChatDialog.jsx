import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Configure,
} from "react-instantsearch-dom";

// context
import { useAuth } from "../../contexts/UserContext";

// mui
import {
  Dialog,
  DialogTitle,
  Box,
  List,
  TextField,
  Stack,
  Typography,
} from "@mui/material";

// component
import SearchResult from "../SearchResult";

const searchClient = algoliasearch(
  "KKY4RFETF5",
  "7c2ffce9f9a96749417bd3cb5ce7994d"
);

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <TextField
      fullWidth
      type="search"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Search users"
    />
  );
};

const Hits = ({ hits }) => {
  const {
    currentUser: { username },
  } = useAuth();

  const filteredHits = hits.filter((hit) => hit.username !== username);

  if (filteredHits.length) {
    return (
      <List>
        {filteredHits.map((hit) => {
          return <SearchResult key={hit.objectID} hit={hit} />;
        })}
      </List>
    );
  }

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100px" }}>
      <Typography>No Results</Typography>
    </Stack>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);

const NewChatDialog = ({ handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "16px", textAlign: "center" }}>
        New Message
      </DialogTitle>

      <Box sx={{ padding: "10px" }}>
        <InstantSearch searchClient={searchClient} indexName="users">
          <CustomSearchBox />
          <Configure hitsPerPage={10} />
          <CustomHits />
        </InstantSearch>
      </Box>
    </Dialog>
  );
};

export default NewChatDialog;
