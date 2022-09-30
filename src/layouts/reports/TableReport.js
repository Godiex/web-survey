import * as React from "react";
import PropTypes from "prop-types";
import TableMui from "../../components/TableMui/TableMui";

function TableReports({
  listClients,
  rowCount,
  page,
  pageSize,
  changePage,
  changePageSize,
  tableColumns,
}) {
  const handlePageSize = (newPageSize) => {
    changePageSize(newPageSize);
  };

  const handleChangePage = (newPage) => changePage(newPage);

  return (
    <>
      <TableMui
        paginationMode="server"
        columns={tableColumns}
        rows={listClients}
        rowCount={rowCount}
        pagination
        page={page}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={handleChangePage}
        onPageSizeChange={handlePageSize}
        disableSelectionOnClick
        checkboxSelection={false}
        autoHeight
      />
    </>
  );
}

// Setting default values for the props of ComplexProjectCard
TableReports.defaultProps = {
  listClients: [],
  tableColumns: [],
};

// Typechecking props for the ProfileInfoCard
TableReports.propTypes = {
  listClients: PropTypes.arrayOf(PropTypes.string),
  rowCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.string),
};

export default TableReports;
