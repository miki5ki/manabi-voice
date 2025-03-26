import { Box, SxProps, Theme } from "@mui/material";

const audioStyles: SxProps<Theme> = {
  width: "80%",
};

const boxStyles: SxProps<Theme> = {
  mt: 1,
  width: "100%",
};

export const SoundPlayer = () => {
  return (
    <Box sx={boxStyles}>
      <Box component="audio" preload="metadata" controls sx={audioStyles}>
        <source src={"/sample_sound.mp3"} type="audio/mp3" />
      </Box>
    </Box>
  );
};
