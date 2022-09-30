import React, { useRef } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import Button from "@mui/material/Button";

// eslint-disable-next-line react/prop-types
function FileUploadPage({ changeHandler }) {
  const ref = useRef();

  return (
    <>
      <div>
        <Button
          color="secondary"
          size="small"
          onClick={() => ref.current.click()}
          startIcon={<BackupIcon />}
        >
          Cargar imagen
        </Button>
        <input
          accept="image/*"
          ref={ref}
          type="file"
          onChange={changeHandler}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
}

export default FileUploadPage;
