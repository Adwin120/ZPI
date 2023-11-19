/**
 * @jest-environment jsdom
 */
import React, { ComponentProps } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import DataTable from "./DataTable";
import { KlientColumnDef } from "./KlientColumnDef";

describe("DataTable - worksheet-like element for displaying data", () => {
    beforeAll(() => {
        (global as any).IS_REACT_ACT_ENVIRONMENT = false;
    })

    test("should display data properties in columns", () => {
        const { getAllByRole } = render(
            <DataTable dataEndpoint="Klient" schema={KlientColumnDef} />
        );
        const headers = getAllByRole("columnheader");

        expect(headers).toHaveLength(3);
        expect(headers[0]).toHaveTextContent("nazwa");
        expect(headers[1]).toHaveTextContent("email");
        expect(headers[2]).toHaveTextContent("adres");
    });
    
    test.todo("should include options to export to csv and pdf");
});
