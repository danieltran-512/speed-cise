import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./styles.css";

const Table = ({ columns, data }) => {
  const [columnNames, setColumnNames] = useState([]);
  columnNames.push("doi");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 3,
        hiddenColumns: [columnNames.toString()],
      },
    },

    useSortBy,
    usePagination
  ); // Render Data Table UI

  const navigate = useNavigate();

  return (
    <>
      {/* Loop through columns data to create checkbox */}
      <p>Click on any header title to sort the table accordingly.</p>
      {allColumns.map((column) => (
        <div class="cb action" key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            <span>{column.Header}</span>
          </label>
        </div>
      ))}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " (Descending)"
                        : " (Ascending)"
                      : ""}
                  </span>
                </th>
              ))}
              <th>Details</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <>
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    </>
                  );
                })}
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      navigate(`${data[i].id}`, {
                        state: {
                          data: data[i],
                        },
                      })
                    }
                  >
                    View Detail
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="text-center mt-2">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>{" "}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </Button>{" "}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </Button>{" "}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[3, 7, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
