import React, { createRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PropTypes from "prop-types";
import AreFIltersSelecteds from "./AreFIltersSelecteds";
import OptionsToFilters from "./OptionsToFilters";

function Filter({ sxButton, columns, arrayFilters, updateFilters, getObjectFilter }) {
  const [isOpenOptionsFilter, setIsOpenOptionsFilter] = useState(null);
  const cardFilter = createRef();
  const columnsAvailable = columns.filter((column) => column.type);

  const openOptionsFilters = () => setIsOpenOptionsFilter(cardFilter.current);

  const closeOptionsFilters = () => setIsOpenOptionsFilter(null);

  const handleChangeFilter = (newArrayFilters) => {
    let newObjectFilter = null;
    if (newArrayFilters.length > 0) {
      const filters = newArrayFilters.map(({ dataFilter }) => {
        const filter =
          typeof dataFilter.fieldRef === "string"
            ? {
                field: dataFilter.fieldRef,
                operator: dataFilter.operatorValue.operator,
                value:
                  typeof dataFilter.value === "string" || typeof dataFilter.value === "number"
                    ? dataFilter.value
                    : dataFilter.value.value,
              }
            : {
                logic: "or",
                filters: dataFilter.fieldRef.map((field) => ({
                  field,
                  operator: dataFilter.operatorValue.operator,
                  value: dataFilter.value,
                })),
              };
        return filter;
      });

      newObjectFilter =
        filters.length > 1
          ? {
              logic: "and",
              filters,
            }
          : filters[0];
      return newObjectFilter;
    }
    return newObjectFilter;
  };

  const handleDelete = (chipToDelete) => {
    const newArrayFilter = arrayFilters.filter((chip) => chip.key !== chipToDelete.key);
    updateFilters(newArrayFilter);
    getObjectFilter(handleChangeFilter(newArrayFilter));
  };

  const handleUpdateFilter = (newArrayFilter) => {
    updateFilters(newArrayFilter);
    getObjectFilter(handleChangeFilter(newArrayFilter));
  };

  return (
    <Grid sx={{ width: "100%" }} container spacing={1} mt={0.1}>
      <Grid item xs={8} ml={1} ref={cardFilter}>
        <AreFIltersSelecteds chipData={arrayFilters} handleDelete={handleDelete} />
      </Grid>
      <Grid item xs={2} display="flex" alignItems="center">
        <Button display="flex" sx={{ ...sxButton, height: "40px" }} onClick={openOptionsFilters}>
          <FilterAltIcon />
        </Button>
        <OptionsToFilters
          anchorEl={isOpenOptionsFilter}
          onClose={closeOptionsFilters}
          filters={arrayFilters}
          columns={columnsAvailable}
          updateFilters={handleUpdateFilter}
        />
      </Grid>
    </Grid>
  );
}
Filter.defaultProps = {
  getObjectFilter: () => {},
  arrayFilters: [],
  updateFilters: () => {},
  sxButton: {},
};

Filter.propTypes = {
  sxButton: PropTypes.objectOf(),
  arrayFilters: PropTypes.arrayOf(),
  updateFilters: PropTypes.func,
  columns: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  getObjectFilter: PropTypes.func,
};
export default Filter;
