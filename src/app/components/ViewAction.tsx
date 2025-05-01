"use client";
import { Search } from "@mui/icons-material";
import { Button, Grid2, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ViewAction = ({ creatable, viewType }: { creatable: boolean; viewType: string }) => {
  const [keyWord, setKeyWord] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const query = keyWord ? `?keyWord=${encodeURIComponent(keyWord)}` : "";
    router.push(`/${viewType}${query}`);
  };

  return (
    <Grid2 container spacing={1} m={3}>
      <TextField
        variant="standard"
        color="secondary"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
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
      <Button variant="outlined" color="secondary" aria-label="検索" onClick={handleSearch}>
        検索
      </Button>
      {creatable && (
        <Button variant="contained" color="primary" href={`/${viewType}/create`}>
          新規作成
        </Button>
      )}
    </Grid2>
  );
};
