import MDBox from "../MDBox";
import MDTypography from "../MDTypography";

// eslint-disable-next-line react/prop-types
const Detail = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log(data);
  return (
    <MDBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
      <MDBox mb={2}>
        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
          {/* eslint-disable-next-line react/prop-types */}
          {data.name.value}
        </MDTypography>
      </MDBox>
      {/* eslint-disable-next-line react/prop-types */}
      {Object.keys(data)
        .filter((e) => e !== "name" && e !== "coordinates" && e !== "id" && e !== "showDetail")
        .map((r) => {
          // eslint-disable-next-line no-console
          console.log(r);
          return (
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                {/* eslint-disable-next-line react/prop-types */}
                {data[r].key}:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  {/* eslint-disable-next-line react/prop-types */}
                  {data[r].value}
                </MDTypography>
              </MDTypography>
            </MDBox>
          );
        })}
    </MDBox>
  );
};

export default Detail;
