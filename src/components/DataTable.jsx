import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns, loading, sx }) => {
  const [pageSize, setPageSize] = useState(50);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      // checkboxSelection
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[50, 100, 300]}
    />
  );
};

export default DataTable;
