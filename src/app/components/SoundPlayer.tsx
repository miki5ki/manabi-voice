"use client";

import { Box } from "@mui/material";

export const SoundPlayer = () => {
  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <audio
        preload="metadata"
        controls
        style={{
          width: "80%",
        }}
      >
        <source src={"/sample_sound.mp3"} type="audio/mp3" />
      </audio>
    </Box>
  );
};
