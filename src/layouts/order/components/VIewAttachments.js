import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import video from "assets/images/logos/video.png";
import audio from "assets/images/logos/audio.png";
import file from "assets/images/logos/file.png";
import MDBox from "components/MDBox";
import Slider from "infinite-react-carousel";

const imagenesMelgar = [
  {
    atchType: 1,
    isTemporary: false,
    questionCode: "SEC6834",
    url: "https://cdn.aidcol.com/attachments/bebd91ca-5179-45b8-809d-7a0253d0ee27.jpg",
  },
  {
    atchType: 1,
    isTemporary: false,
    questionCode: "SEC6834",
    url: "https://cdn.aidcol.com/attachments/62f43725-faa9-40e3-94c1-4be03bea82f8.jpg",
  },
];

function ViewAttachment({ attachments }) {
  const [currentTarget, setCurrentTarget] = useState(null);
  const handleOpen = (item) => setCurrentTarget(item);
  const handleClose = () => setCurrentTarget(null);
  const attachmentMelgar = [...attachments, ...imagenesMelgar];
  const renderMultimedia = () => {
    switch (currentTarget?.atchType) {
      case 1:
        return (
          <img
            width="100%"
            height="100%"
            sx={{ m: 2 }}
            src={currentTarget?.url}
            srcSet={currentTarget?.url}
            alt={currentTarget?.title}
            loading="lazy"
          />
        );
      case 0:
        return (
          /* eslint-disable jsx-a11y/media-has-caption */
          <video controls width="100%" height="720px" sx={{ objectFit: "cover" }}>
            <source src={currentTarget?.url} type="video/mp4" />
            <track />
          </video>
        );
      case 2:
        return (
          /* eslint-disable jsx-a11y/media-has-caption */
          <video controls width="570px" height="60px" name="media">
            <source src={currentTarget?.url} type="audio/mp3" />
            <track />
          </video>
        );
      default:
        return (
          <img
            width="100%"
            height="100%"
            sx={{ m: 2 }}
            src={currentTarget?.url}
            srcSet={currentTarget?.url}
            alt={currentTarget?.title}
            loading="lazy"
          />
        );
    }
  };

  const getUrl = (type, url) => {
    switch (type) {
      case 1:
        return url;
      case 0:
        return video;
      case 2:
        return audio;
      default:
        return file;
    }
  };

  return (
    <>
      {attachments.length > 0 && (
        <>
          <Slider slidesToShow={6} dots>
            {attachmentMelgar.map((item) => (
              <>
                {false && (
                  <MDBox
                    onClick={() => {
                      handleOpen(item);
                    }}
                  >
                    <img
                      src={getUrl(item.atchType, item.url)}
                      srcSet={getUrl(item.atchType, item.url)}
                      alt={item.questionCode}
                      loading="lazy"
                    />
                  </MDBox>
                )}
                <MDBox sx={{ width: 100, height: 100 }}>
                  <MDBox
                    component="img"
                    src={getUrl(item.atchType, item.url)}
                    alt={item.questionCode}
                    loading="lazy"
                    onClick={() => {
                      handleOpen(item);
                    }}
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      cursor: "pointer ",
                    }}
                  />
                </MDBox>
              </>
            ))}
          </Slider>

          <Dialog
            aria-labelledby="responsive-dialog-title"
            open={Boolean(currentTarget)}
            onClose={handleClose}
          >
            {renderMultimedia()}
          </Dialog>
        </>
      )}
    </>
  );
}

ViewAttachment.defaultProps = {
  attachments: [],
};

ViewAttachment.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
};

export default ViewAttachment;
