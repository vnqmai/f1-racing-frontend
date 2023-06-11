import * as React from "react";
import Table from "react-bootstrap/Table";
import { DataTableField } from "@/types";

export interface IF1DataTableProps {
  fields: DataTableField[];
  items: any[];
}

export default function F1DataTable(props: IF1DataTableProps) {
  const { fields, items } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {fields.map((field) => (
            <th>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr>
            {fields.map((field) => (
              <td>
                {field.formatData ? field.formatData(item) : item[field.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
