import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setGeometryLocations, setGeometryLocationsInitial } from "../../store/map/actions";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyAKlcg3KFkR5dPgq2JLkcDHP2Yq4moIcA4";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function AutocompleteGoogleMap({ defaultValue, label }) {
  const [value, setValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);
  const dispatch = useDispatch();

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetchPoints = async (placeId) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!placeId) reject("placeId not provided");

      try {
        new window.google.maps.places.PlacesService(document.createElement("div")).getDetails(
          {
            placeId,
            fields: ["geometry"],
          },
          (details) => resolve(details)
        );
      } catch (e) {
        reject(e);
      }
    });

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) newOptions = [value];

        if (results) newOptions = [...newOptions, ...results];

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      required
      fullWidth
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={async (event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        if (newValue) {
          const points = await fetchPoints(newValue.place_id);
          const lat = points.geometry.location.lat();
          const lng = points.geometry.location.lng();
          const location = { lat, lng };
          dispatch(setGeometryLocations(location, newValue.description, 19));
        } else dispatch(setGeometryLocationsInitial(false));
        // eslint-disable-next-line no-console
        console.log({ newValue });
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          variant="standard"
          required
          {...params}
          label={label}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box component={LocationOnIcon} sx={{ color: "text.secondary", mr: 2 }} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

AutocompleteGoogleMap.defaultProps = {
  label: "Dirección",
  defaultValue: null,
};

AutocompleteGoogleMap.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string,
};
