import type { ReactElement } from "react";
import { faker } from "@faker-js/faker";

export function StorybookTableContentComponent(): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 150 }, (_, i) => (
            <tr key={i}>
              <td>{faker.internet.username()}</td>
              <td>{faker.internet.email()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
