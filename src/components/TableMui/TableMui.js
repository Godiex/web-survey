import {
  DataGrid,
  esES,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Filter from "../Filter";

const TableMui = (props) => {
  const {
    key,
    columns,
    pagination,
    onPageChange,
    onPageSizeChange,
    rowCount,
    loading,
    rows,
    rowsPerPageOptions,
    page,
    disableSelectionOnClick,
    checkboxSelection,
    autoHeight,
    onCellClick,
    pageSize,
    paginationMode,
    onSelectionModelChange,
    selectionModel,
    autoPageSize,
    isFilterActive,
    getDataSdvancedFilter,
    filters,
    updateFilters,
  } = props;

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Grid container>
        {isFilterActive && (
          <Grid item xs={8}>
            <Filter
              columns={columns}
              getObjectFilter={getDataSdvancedFilter}
              arrayFilters={filters}
              updateFilters={updateFilters}
            />
          </Grid>
        )}
        <Grid item xs={2} display="flex" alignItems="center">
          {" "}
          <GridToolbarColumnsButton />
        </Grid>
        <Grid item xs={2} display="flex" alignItems="center">
          {" "}
          <GridToolbarDensitySelector />
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );

  const columnsWithOrWhithoutCheckbox = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerName: "Columna de seleccion",
      renderHeader: () => " ",
    },
    ...columns,
  ];
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        key={`table-${key}`}
        sx={{
          "& div .MuiDataGrid-columnHeaders": {
            lineHeight: "inherit !important",
          },
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        disableColumnMenu
        page={page}
        components={{
          Toolbar: CustomToolbar,
        }}
        pageSize={pageSize}
        onPageChange={onPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        columns={columnsWithOrWhithoutCheckbox}
        pagination={pagination}
        onPageSizeChange={onPageSizeChange}
        rowCount={rowCount}
        loading={loading}
        rows={rows}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        paginationMode={paginationMode}
        disableSelectionOnClick={disableSelectionOnClick}
        checkboxSelection={checkboxSelection}
        autoHeight={autoHeight}
        onCellClick={onCellClick}
        autoPageSize={autoPageSize}
        disableColumnFilter
      />
    </div>
  );
};

TableMui.defaultProps = {
  autoHeight: false,
  autoPageSize: false,
  checkboxSelection: false,
  paginationMode: "",
  loading: false,
  pagination: null,
  page: 0,
  disableSelectionOnClick: false,
  rowsPerPageOptions: [5, 10, 20],
  pageSize: 100,
  selectionModel: [],
  isFilterActive: true,
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

TableMui.propTypes = {
  key: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  autoHeight: PropTypes.bool,
  autoPageSize: PropTypes.bool,
  checkboxSelection: PropTypes.bool,
  paginationMode: PropTypes.string,
  pagination: PropTypes.elementType,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number,
  disableSelectionOnClick: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  // eslint-disable-next-line react/require-default-props
  onCellClick: PropTypes.func,
  pageSize: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  onSelectionModelChange: PropTypes.func,
  selectionModel: PropTypes.arrayOf(),
  isFilterActive: PropTypes.bool,
  filters: PropTypes.arrayOf(),
  updateFilters: PropTypes.func,
  getDataSdvancedFilter: PropTypes.func,
};

export default TableMui;
