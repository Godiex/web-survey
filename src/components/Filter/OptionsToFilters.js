import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import operatorsToFilter from "./OperatorsFilters";
import MDButton from "../MDButton";

const initialValues = {
  name: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string(),
});

function OptionsToFilters({ anchorEl, onClose, filters, columns, updateFilters }) {
  const [filtros, setFiltros] = useState([
    {
      key: Math.random(),
      label: "",
      dataFilter: { columnField: "", operatorValue: null, value: "" },
    },
  ]);
  const handleAddFilter = () => {
    const currentFilters = filtros;
    setFiltros([
      ...currentFilters,
      {
        key: Math.random(),
        label: "",
        dataFilter: { columnField: "", operatorValue: null, value: "", fieldRef: "" },
      },
    ]);
  };
  const removeFilters = (itemToDelete) => {
    const newArray = filtros.filter((item) => item.key !== itemToDelete.key);
    setFiltros(newArray);
  };

  const getColumByName = (name) => columns.find((column) => column.headerName === name);
  const getOperator = (optionSelect) =>
    operatorsToFilter.find((options) => options === optionSelect);

  const onChageDataInfilter = (currentFilter, dataFilter) => {
    const filtersWithoutChanges = filtros.map((filter) => {
      if (filter.key === currentFilter.key) {
        const filterWithChanges = {
          ...currentFilter,
          dataFilter: { ...currentFilter.dataFilter, ...dataFilter },
        };
        return filterWithChanges;
      }
      return filter;
    });
    setFiltros(filtersWithoutChanges);
  };

  const handleAccept = () => {
    const filterWithLabel = filtros.map((filter) => {
      const currentValue =
        typeof filter.dataFilter.value === "string" || typeof filter.dataFilter.value === "number"
          ? filter.dataFilter.value
          : filter.dataFilter.value.name;
      const filterWithChanges = {
        ...filter,
        label: `${filter.dataFilter.columnField} ${filter.dataFilter.operatorValue.name} ${currentValue}`,
      };
      return filterWithChanges;
    });
    updateFilters(filterWithLabel);
  };

  const getTypeInput = (typeColum) => {
    switch (typeColum) {
      case "date":
        return "date";
      case "number":
        return "number";
      case "dateTime":
        return "datetime-local";
      default:
        return "text";
    }
  };

  const getOptionsOperators = (nameColumn) => {
    const columnSelected = columns.find((column) => column.headerName === nameColumn);
    let options = [];
    if (columnSelected)
      options = operatorsToFilter.filter(
        (operator) => operator.typeValid.indexOf(columnSelected.type) !== -1
      );
    return options;
  };

  const renderInputValue = (column, filter) => {
    const layout =
      column && (column.type === "boolean" || column?.filterOptions) ? (
        <Autocomplete
          sx={{ width: "100%" }}
          key={`autocomplete-value-${filter.key}`}
          options={column.filterOptions}
          getOptionLabel={(option) => option.name}
          id={`autocomplete-value-${filter.key}`}
          value={getOperator(filter.dataFilter.value)}
          onChange={(event, newValue) => {
            if (newValue) onChageDataInfilter(filter, { value: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Valor" variant="standard" />
          )}
        />
      ) : (
        <TextField
          key={`fild-value-${filter.key}`}
          sx={{ width: "100%" }}
          required
          type={getTypeInput(column?.type)}
          value={filter.dataFilter.value}
          onChange={(event) => {
            const value =
              column?.type === "number" ? parseInt(event.target.value, 10) : event.target.value;
            onChageDataInfilter(filter, { value });
          }}
          label="Valor"
          variant="standard"
        />
      );
    return layout;
  };

  useEffect(() => {
    if (filters.length > 0) setFiltros([...filters]);
    else
      setFiltros([
        {
          key: Math.random(),
          label: "",
          dataFilter: { columnField: "", operatorValue: null, value: "", fieldRef: "" },
        },
      ]);
  }, [filters]);
  return (
    <Popover
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          p: 0,
          mt: 0.5,
          width: "700px",
        },
      }}
      id="filterTables"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Card style={{ width: "100%", height: "100%" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => handleAccept()}
        >
          {() => (
            <Form>
              <Grid container p={1}>
                <Grid item xs={12} sx={{ maxHeight: "300px", overflowX: "none" }}>
                  {filtros.map((filter, index) => (
                    <Grid container spacing={1}>
                      <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
                        {index !== 0 && (
                          <IconButton
                            key={`button-delete-${filter.key}`}
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => removeFilters(filter)}
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item xs={5}>
                        <Autocomplete
                          key={`autocomplete-column-${filter.key}`}
                          options={columns}
                          getOptionLabel={(option) => option.headerName}
                          value={getColumByName(filter.dataFilter.columnField)}
                          onChange={(event, newValue) => {
                            if (newValue)
                              onChageDataInfilter(filter, {
                                columnField: newValue.headerName,
                                value: null,
                                fieldRef: newValue.fieldRef,
                              });
                          }}
                          id="disable-close-on-select"
                          renderInput={(params) => (
                            <TextField {...params} required label="Columna" variant="standard" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Autocomplete
                          key={`autocomplete-operator-${filter.key}`}
                          options={getOptionsOperators(filter.dataFilter.columnField)}
                          getOptionLabel={(option) => option.name}
                          id="options-operation-filter"
                          value={getOperator(filter.dataFilter.operatorValue)}
                          onChange={(event, newValue) => {
                            if (newValue) onChageDataInfilter(filter, { operatorValue: newValue });
                          }}
                          renderInput={(params) => (
                            <TextField {...params} required label="Operadores" variant="standard" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {renderInputValue(getColumByName(filter.dataFilter.columnField), filter)}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={3}>
                      <MDButton
                        color="light"
                        variant="gradient"
                        fullWidth
                        onClick={handleAddFilter}
                      >
                        Nuevo filtro
                      </MDButton>
                    </Grid>
                    <Grid item xs={4}>
                      <MDButton type="submit" color="light" variant="gradient" fullWidth>
                        Agregar filtros
                      </MDButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </Popover>
  );
}
OptionsToFilters.propTypes = {
  anchorEl: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  columns: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  updateFilters: PropTypes.func.isRequired,
};
export default OptionsToFilters;
