import * as React from "react";
import Table from "react-bootstrap/Table";
import { DataTableField } from "@/types";
import "./F1DataTable.scss";

export interface IF1DataTableProps {
  fields: DataTableField[];
  items: any[];
}

export default function F1DataTable(props: IF1DataTableProps) {
  const { fields, items } = props;

  return (
    <Table className="f1-data-table" striped bordered hover>
      <thead>
        <tr>
          {fields.map((field) => (
            <th className={`column-${field.name}`}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          items?.length > 0 ?
          items.map((item) => (
            <tr>
              {fields.map((field) => (
                <td className={`column-${field.name}`}>
                  {field.formatData ? field.formatData(item) : item[field.name]}
                </td>
              ))}
            </tr>
          )) :
          <tr>
            <td colSpan={fields.length} className="f1-data-table-no-result">No results</td>
          </tr>
        }
      </tbody>
    </Table>
  );
}
