import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { Chip } from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "utils/utils";
import { useAlert } from "react-alert";
import TableMui from "../../../../components/TableMui/TableMui";
import {
  getGeneratedCertificates,
  getCertificatePdf,
  sendNotifYCustomer,
} from "../../../../store/certificate/actions";

function ListGeneratedCertificates({ callback }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [listPayments, setListPayments] = useState([]);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePageSize = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handleChangePage = (newPage) => setPage(newPage);

  const handleSelectPdfToView = async (url, nameCertificate, nameCustomer) => {
    const blob = await dispatch(getCertificatePdf(url));
    const bloobUrl = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = bloobUrl;
    link.download = `${nameCertificate}_${nameCustomer}.pdf`;
    callback(link);
  };

  const handleSendNotifi = async (certificateCustomerId) => {
    try {
      await dispatch(sendNotifYCustomer({ certificateCustomerId }));
      alert.success("Se envio la notificacion al cliente con exito", { position: "top right" });
    } catch (e) {
      alert.error("Error al enviar notificacion al cliente", { position: "top right" });
    }
  };

  const handleFilter = async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    const payload = await dispatch(getGeneratedCertificates(dataSearch));
    if (payload) {
      setListPayments(payload.data);
      setRowCount(payload.totalCount);
    }
  };

  const getColor = (nDaysToExpire) => {
    if (nDaysToExpire > 30) return "success";
    if (nDaysToExpire <= 30 && nDaysToExpire >= 15) return "warning";
    if (nDaysToExpire < 15 && nDaysToExpire >= 5) return "warning";
    return "default";
  };

  useEffect(() => {
    handleFilter();
  }, [page, pageSize, advancedFilter]);

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "certificateName",
      headerName: "Certificado",
      type: "string",
      fieldRef: "certificate.name",
      minWidth: 300,
      renderCell: ({ row }) => row.certificate.name,
    },
    {
      field: "serviceName",
      headerName: "Servicio",
      type: "string",
      fieldRef: "serviceOrder.service.nameService",
      width: 200,
      renderCell: ({ row }) => row.serviceOrder.service.nameService,
    },
    {
      field: "certificateDescription",
      headerName: "Description",
      type: "string",
      fieldRef: "serviceOrder.service.description",
      width: 200,
      renderCell: ({ row }) => row.serviceOrder.service.description,
    },
    {
      field: "customerName",
      headerName: "Cliente",
      type: "string",
      width: 200,
      fieldRef: "serviceOrder.customer.name",
      renderCell: ({ row }) => row.serviceOrder.customer.name,
    },
    {
      field: "expiresOn",
      headerName: "Fecha de expiración",
      type: "datetime",
      width: 200,
      fieldRef: "expiresOn",
      renderCell: ({ row }) => formatDate(row.expiresOn),
    },
    {
      field: "nDaysToExpire",
      headerName: "Dias para expirar",
      type: "number",
      width: 200,
      fieldRef: "nDaysToExpire",
      /* eslint-disable react/prop-types */
      renderCell: ({ row }) => (
        <Chip label={row.nDaysToExpire} color={getColor(row.nDaysToExpire)} variant="outlined" />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      /* eslint-disable react/prop-types */
      renderCell: ({ row }) => (
        <>
          <Tooltip key="previewCertificate" title="Previsualizar certificado" placement="bottom">
            <IconButton
              onClick={() =>
                handleSelectPdfToView(
                  row.routeCertificate,
                  row.serviceOrder.service.nameService,
                  row.serviceOrder.customer.name
                )
              }
            >
              <Icon fontSize="medium">preview_icon</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip key="previewCertificate" title="Enviar notificacion" placement="bottom">
            <IconButton onClick={() => handleSendNotifi(row.serviceOrder.customer.id)}>
              <Icon fontSize="medium">forward_to_inbox_icon</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableMui
      paginationMode="server"
      columns={columns}
      rows={listPayments}
      disableSelectionOnClick
      checkboxSelection={false}
      autoHeight
      rowCount={rowCount}
      pagination
      page={page}
      pageSize={pageSize}
      rowsPerPageOptions={[5, 10, 20]}
      onPageChange={handleChangePage}
      onPageSizeChange={handlePageSize}
      filters={filters}
      updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
      getDataSdvancedFilter={(filter) => {
        setAdvancedFilter(filter);
      }}
    />
  );
}

ListGeneratedCertificates.propTypes = {
  callback: PropTypes.func.isRequired,
};
export default ListGeneratedCertificates;
