import { Search } from "@mui/icons-material";
import { Button, Grid2, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const ViewAction = ({ viewType }: { viewType: string }) => {
  return (
    <Grid2 container spacing={1} m={3}>
      <TextField
        variant="standard"
        color="secondary"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button variant="outlined" color="secondary">
        検索
      </Button>

      <Button variant="contained" color="primary" href={`/${viewType}/create`}>
        新規作成
      </Button>
    </Grid2>
  );
};
