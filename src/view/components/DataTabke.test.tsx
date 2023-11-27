/**
 * @jest-environment jsdom
 */
import React, { ComponentProps } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "./DataTable";

describe("DataTable - worksheet-like element for displaying data", () => {
    beforeAll(() => {
        (global as any).IS_REACT_ACT_ENVIRONMENT = false;
    });

    const mockSchema = [
        { field: "nazwa", flex: 1 },
        { field: "email", flex: 1 },
        { field: "adres", flex: 1 },
    ];

    test("should display data properties in columns", () => {
        const { getAllByRole } = render(<DataTable dataEndpoint="Klient" schema={mockSchema} />);
        const headers = getAllByRole("columnheader");

        expect(headers).toHaveLength(3);
        expect(headers[0]).toHaveTextContent("nazwa");
        expect(headers[1]).toHaveTextContent("email");
        expect(headers[2]).toHaveTextContent("adres");
    });

    test.todo("should include options to export to csv and pdf");
});
