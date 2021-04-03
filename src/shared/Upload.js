import React from 'react'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const Upload = () => {
  return(
    <Button
        variant="outlined"
        component="label"
        color="default"
        startIcon={<CloudUploadIcon />}
        size = "small"
      >
        <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" />
        Picture
      </Button>
  )

}

export default Upload